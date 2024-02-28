import { useEffect, useState } from "react"
import { Card } from "../reusable"
import { getAllProducts, getAllCategories } from "../api/ordersApi"
import Lottie from "lottie-react";
import loading from "../animations/loading.json"
import "../css/homepage.css"
import "../css/categorychip.css"
import { useDispatch, useSelector } from "react-redux";
import { filteredProduct, setAllProducts } from "../store/slice/UserSlice";
import {
  books,
  clothes,
  computer,
  electronics,
  mobiles,
  stationary,
  toys,
  watches,
  bags,
} from "../assets/CategoryChips"

const HomePage = () => {

  // States
  const [products, setProducts] = useState([]);
  const [categoriesList, setCategoriesList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("select");
  const dispatch = useDispatch();
  const { filteredProducts } = useSelector((state) => state.users);

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
      {/* <div className="col-md-4 col-sm-4 col-xs-3 mb-3">

        <select name="filter" onChange={handleCategoryChange}>
          <option value="select">select</option>
          {categoriesList.map((item, i) => (
            <option value={item.productCategory} key={i}>{item.productDescription}</option>
          ))}
        </select>

      </div> */}
      <div className="d-flex flex-column ">
        <div className="d-flex ">
          <div className="cat-line" />
          <p className="category-text mt-2">categories</p>
        </div>
        <h3 style={{fontFamily : "sans-serif"}}>Browse By Category :-</h3>
      </div>
      <div className="category-chips-container d-flex flex-wrap gap-4 justify-content-lg-around p-2 pb-3 mb-3">
        <div
          className='category-chip'
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="Electronics"
        >
          <img src={electronics} alt="Electronics" className="category-chip" />
        </div>
        <div
          className='category-chip'
          data-toggle="tooltip"
          data-placement="bottom"
          title="Books"
        >
          <img src={books} alt="Books" className="category-chip" />
        </div>
        <div
          className='category-chip'
          data-toggle="tooltip"
          data-placement="bottom"
          title="Mobiles"
        >
          <img src={mobiles} alt="Mobiles" className="category-chip" />
        </div>
        <div
          className='category-chip'
          data-toggle="tooltip"
          data-placement="bottom"
          title="Clothes"
        >
          <img src={clothes} alt="Clothes" className="category-chip" />
        </div>
        <div
          className='category-chip'
          data-toggle="tooltip"
          data-placement="bottom"
          title="Computer"
        >
          <img src={computer} alt="Computer" className="category-chip" />
        </div>
        <div
          className='category-chip'
          data-toggle="tooltip"
          data-placement="bottom"
          title="Stationary"
        >
          <img src={stationary} alt="Stationary" className="category-chip" />
        </div>
        <div
          className='category-chip'
          data-toggle="tooltip"
          data-placement="bottom"
          title="Toys"
        >
          <img src={toys} alt="Toys" className="category-chip" />
        </div>
        <div
          className='category-chip'
          data-toggle="tooltip"
          data-placement="bottom"
          title="Watches"
        >
          <img src={watches} alt="Watches" className="category-chip" />
        </div>
        <div
          className='category-chip'
          data-toggle="tooltip"
          data-placement="bottom"
          title="Bags"
        >
          <img src={bags} alt="Bags" className="category-chip" />
        </div>
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