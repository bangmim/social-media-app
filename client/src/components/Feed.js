import { useState, useEffect, Suspense } from "react";
import ArticleTemplate from "./ArticleTemplate";
import fetchData from "../utils/fetchData"

const limit=5;  // 한 번에 보이는 게시물의 양 (5개씩 화면에 출력 >> more버튼 클릭 >> 5개 추가 출력)

// ArticleTemplate를 활용하여 반복적으로 사용하게 된다
export default function Feed(){
    const[error, setError]= useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [articles, setArticles] = useState([]);
    const [skip, setSkip] = useState(0);

    useEffect(()=>{
        setIsLoaded(false);
        setError(null);

        // # DB에 쿼리를 전송하기 위해 사용되는 단어
        // limit : 한 번 요청(버튼을 누를때)시에 가져오는 데이터의 개수
        // skip : 몇 개의 데이터를 건너뛸 것인지 정하는 변수    (다른 DB에서는 offset이라고 표현하기도 한다)

        fetchData(`${process.env.REACT_APP_SERVER}/feed/?limit=${limit}&skip=${skip}`)
        .then(data=>{
            // console.log(data)
            setArticles([...articles, ...data])
        })
        .catch(error=>{
            setError(error)
        })
        .finally(()=>setIsLoaded(true))

    },[skip])   // skip하지 않으면 가져온 게시물을 또 가져오게 된다

    function unfavorite(articleId){
        fetch(`${process.env.REACT_APP_SERVER}/articles/${articleId}/favorite`,{
            method: 'DELETE',
            headers:{'Authorization':`Bearer ${localStorage.getItem("token")}`}
        })
        .then(res=>{
            if(!res.ok){
                throw res;
            }

            const editedArticles = articles.map(article=>{
                if(articleId === article._id){
                    return {...article, isFavorite:false,
                    favoriteCount:article.favoriteCount -1};
                }
                return article;
            })

            setArticles(editedArticles)

        })
        .catch(error=>{
            alert("Something's broken")
        });
    };

    function favorite(articleId){
        fetch(`${process.env.REACT_APP_SERVER}/articles/${articleId}/favorite`,{
            method:"POST",
            headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}
        })
        .then(res=>{
            if(!res.ok){
                throw res;
            }

            const editedArticles = articles.map(article=>{
                if(articleId===article._id){
                    return {...article, isFavorite:true,
                    favoriteCount:article.favoriteCount+1};
                }
                return article;
            })
            setArticles(editedArticles);

        })
        .catch(error=>{
            alert("Something's broken");
        })
    }

    function deleteArticle(articleId){
        fetch(`${process.env.REACT_APP_SERVER}/articles/${articleId}`,{
            method:"DELETE",
            headers:{"Authorization":`Bearer ${localStorage.getItem("token")}`}
        })
        .then(res=>{
            if(!res.ok){
                throw res;
            }
            // article 업데이트
            const updatedArticles = articles.filter(article=> articleId !== article._id);
            setArticles(updatedArticles);
        })
        .catch(error=>{
            alert("Something's broken")
        })
    };

    console.log(articles)

    // ArticleTemplate 재사용 >> article들(articles)을 템플릿 안에 적용한다 (로그인 유저 게시물 + 팔로우하는 유저의 게시물)
    const articleList = articles.map(article=>(
        <li key={article._id} className="mb-4">
            <ArticleTemplate
                article={article}
                favorite={favorite}
                unfavorite={unfavorite}
                deleteArticle={deleteArticle}
                />
        </li>
    ))

    console.log(articles)

    return(
        <>
        {/* 피드 목록 */}
        <ul className="">
            {articleList}
        </ul>

        {/* 더보기 버튼 */}
        <div className="flex justify-center my-2">
            <button className="p-1 text-blue-500" onClick={()=>setSkip(skip + limit)}>More</button>
        </div>

        {!isLoaded && <p>fetching feed ...</p>}
        {error && <p>failed to fetch feed</p>}

        </>
    )
};