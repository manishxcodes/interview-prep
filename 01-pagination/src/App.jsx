import { useEffect, useState } from 'react'
import './App.css'

function App() {
    const [products, setProducts] = useState([]);
    const [page, setPage] = useState(1);

    const fetchProducts = async () => {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();

        if(data && data.products) {
            setProducts(data.products);
        }
    }  

    console.log("products: ", products);

    useEffect(() => {
        fetchProducts();
    }, [])

    const selectPage = (idx) => {
        setPage(idx);
    }

    const handlePrevPage = () => {
        if(page > 1) {
            setPage(page - 1);
        } else {
            return;
        }
    }

    const handleNextPage = () => {
        if(page < products.length / 6) {
            setPage(page + 1);
        } else {
            return;
        }
    }

    return (
        <div className='app'>
            {
                products.length > 0 && 
                <div className='products'>
                    {
                        products.slice(page * 6 - 6, page * 6).map((product) => {
                            return (
                                <div className='product' key={product.id}>
                                    <img src={product.thumbnail} alt={product.title}/>
                                    <p>{product.title}</p>
                                </div>
                            )
                        })
                    }
                </div>
            }
            {
                products.length > 0 && 
                <div className='pagination'>
                    <span onClick={handlePrevPage}>⬅️</span>
                        {
                            [...Array(products.length / 6)].map((_, idx) => {
                              return <span className={page === idx + 1 ? "pagination__select": ""} onClick={() => selectPage(idx + 1)} key={idx}>{idx + 1}</span>
                            })
                        }
                    <span onClick={handleNextPage}>➡️</span>
                </div>
            }
        </div>
    )
}

export default App
