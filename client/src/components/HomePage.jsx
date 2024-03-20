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
import { motion } from "framer-motion"

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
    console.log(e.target.id);
    setProducts([])
    const cat = e.target.id;
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
        <h3 style={{ fontFamily: "sans-serif" }}>Browse By Category :-</h3>
      </div>
      <div className="category-chips-container d-flex flex-wrap gap-4 justify-content-lg-around p-2 pb-3 mb-3">
        <div
          className='category-chip d-flex justify-content-center align-items-center'
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="All"
          onClick={handleCategoryChange}
        >
          <p className="w-100" id="select">All</p>
        </div>
        <div
          className='category-chip'
          data-bs-toggle="tooltip"
          data-bs-placement="bottom"
          title="Electronics"
          onClick={handleCategoryChange}
        >
          <img src={electronics} alt="Electronics" id="2050" className="category-chip" />
        </div>
        <div
          className='category-chip'
          data-toggle="tooltip"
          data-placement="bottom"
          title="Books"
          onClick={handleCategoryChange}
        >
          <img src={books} alt="Books" id="2054" className="category-chip" />
        </div>
        <div
          className='category-chip'
          data-toggle="tooltip"
          data-placement="bottom"
          title="Mobiles"
          onClick={handleCategoryChange}
        >
          <img src={mobiles} alt="Mobiles" id="2055" className="category-chip" />
        </div>
        <div
          className='category-chip'
          data-toggle="tooltip"
          data-placement="bottom"
          title="Clothes"
          onClick={handleCategoryChange}
        >
          <img src={clothes} alt="Clothes" id="2052" className="category-chip" />
        </div>
        <div
          className='category-chip'
          data-toggle="tooltip"
          data-placement="bottom"
          title="Computer"
          onClick={handleCategoryChange}
        >
          <img src={computer} alt="Computer" id="2053" className="category-chip" />
        </div>
        <div
          className='category-chip'
          data-toggle="tooltip"
          data-placement="bottom"
          title="Stationary"
          onClick={handleCategoryChange}
        >
          <img src={stationary} alt="Stationary" id="2056" className="category-chip" />
        </div>
        <div
          className='category-chip'
          data-toggle="tooltip"
          data-placement="bottom"
          title="Toys"
          onClick={handleCategoryChange}
        >
          <img src={toys} alt="Toys" id="2051" className="category-chip" />
        </div>
        <div
          className='category-chip'
          data-toggle="tooltip"
          data-placement="bottom"
          title="Watches"
          onClick={handleCategoryChange}
        >
          <img src={watches} alt="Watches" id="2057" className="category-chip" />
        </div>
        <div
          className='category-chip'
          data-toggle="tooltip"
          data-placement="bottom"
          title="Bags"
          onClick={handleCategoryChange}
        >
          <img src={bags} alt="Bags" id="2059" className="category-chip" />
        </div>
      </div>


      {products.length !== 0 ?
        <motion.div
          initial="hidden"
          whileInView="visible"
          className="container col-12 d-flex justify-content-center gap-3 p-2 border border-2 flex-wrap "
          transition={{ duration: 0.4 }}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
        >
          {
            products.map((product, i) => (
              <Card product={product} key={i} />
            ))
          }
        </motion.div>
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