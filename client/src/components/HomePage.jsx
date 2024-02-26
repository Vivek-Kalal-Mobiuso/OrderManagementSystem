import { useEffect, useState } from "react"
import { Card } from "../reusable"
import { getAllProducts, getAllCategories } from "../api/ordersApi"
import Lottie from "lottie-react";
import loading from "../animations/loading.json"
import "../css/homepage.css"
import { useDispatch, useSelector } from "react-redux";
import { filteredProduct, setAllProducts } from "../store/slice/UserSlice";

const HomePage = () => {

  // States
  const [products, setProducts] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("select");
  const dispatch = useDispatch();
  const { filteredProducts , allProducts } = useSelector((state) => state.users);

  // Functions
  const loadProucts = async () => {
    if (products.length === 0) {
      const data = await getAllProducts();
      setProducts(data.products)
      dispatch(setAllProducts({ products: data.products }))
    }
  }
  const loadCategories = async () => {
    if (categoriesList.length === 0) {
      const categories = await getAllCategories();

      setCategoriesList(categories)
    }
  }

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setSelectedCategory(cat)
    dispatch(filteredProduct(cat))
  }

  useEffect(() => {
    loadCategories()
    loadProucts()
  }, [])

  useEffect(() => {
    setProducts(filteredProducts)
  }, [filteredProducts])

  return (
    <div className='container mt-4'>
      <div className="col-md-4 col-sm-4 col-xs-3 mb-3">

        <select name="filter" onChange={handleCategoryChange}>
          <option value="select">select</option>
          {categoriesList.map((item, i) => (
            <option value={item.productCategory} key={i}>{item.productDescription}</option>
          ))}
        </select>

      </div>
      {products.length !== 0 ?
        <div className="container col-12 d-flex justify-content-center gap-3 p-2 border border-2 flex-wrap ">
          {
            products.map((product, i) => (
              <Card product={product} key={i} />
            ))
          }
        </div>
        :
        <div className="animation d-flex flex-column">
          <Lottie animationData={loading} loop={true} />
          <h1>Hang On...</h1>
        </div>
      }
    </div>
  )
}

export default HomePage