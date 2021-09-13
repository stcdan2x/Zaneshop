import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { listProductDetails, updateProduct } from "../actions/productActions";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";


const ProductEditScreen = (props) => {
   const productId = props.match.params.id;

   const [name, setName] = useState("");
   const [price, setPrice] = useState(0.00);
   const [image, setImage] = useState("");
   const [brand, setBrand] = useState("");
   const [category, setCategory] = useState("");
   const [countInStock, setCountInStock] = useState("");
   const [description, setDescription] = useState("");
   const [uploading, setUploading] = useState(false);
   const [uploadingError, setUploadingError] = useState("");


   const dispatch = useDispatch();
   
   const productDetails = useSelector(state => state.productDetails);
   const { product, loading, error } = productDetails;
   
   const productUpdate = useSelector(state => state.productUpdate);
   const { success:successUpdate, loading:loadingUpdate, error:errorUpdate } = productUpdate;
   
   useEffect(() => {
      if (successUpdate) {
         dispatch({ type: PRODUCT_UPDATE_RESET })
         props.history.push("/admin/productlist")
      } else {
         if (!product.name || product._id !== productId ) {
            dispatch(listProductDetails(productId))
         } else {
            setName(product.name)
            setPrice(product.price)
            setImage(product.image)
            setBrand(product.brand)
            setCategory(product.category)
            setCountInStock(product.countInStock)
            setDescription(product.description)         
         }
      }
   
   }, [dispatch, productId, product, props.history, successUpdate]);
   
   const submitHandler = (e) => {
      e.preventDefault();
      dispatch(updateProduct({
         _id: productId,
         name,
         price,
         image,
         brand,
         category,
         countInStock,
         description
      }));
   };

   const uploadFileHandler = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      setUploading(true);

      try {
         const response = await axios({
            url: "/api/upload",
            method: "POST",
            headers: {
               "Content-Type": "multipart/form-data",
            },
            data: formData
         })

         setImage(response.data);
         setUploading(false);

      } catch (error) {
         console.error(error);
         console.log(error);
         setUploading(false);
         setUploadingError("Upload error, unsupported file type.");
      }
   }
   
      return (
         <>
            <Link to="/admin/productlist" className="btn btn-light my-3" >Go Back</Link>
         <FormContainer >
            <h1 className="pt-3" >Edit Product</h1>
            {loadingUpdate && <Loader />}
            {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
            <Form onSubmit={submitHandler} >
               <Form.Group controlId="name" className="py-2">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                     type="name"
                     placeholder="Enter Product Name"
                     value={name}
                     required
                     onChange={ (e) => setName(e.target.value) }>
                  </Form.Control>
               </Form.Group>
               <Form.Group controlId="price" className="py-2">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                     type="number"
                     placeholder="Enter Price"
                     min={0.00}
                     step={0.01}
                     value={price}
                     required
                     onChange={ (e) => {
                        if (e.target.value < 0) {
                           e.target.value = 0.00;
                           setPrice(e.target.value)
                        } else {
                           setPrice(e.target.value)
                        }
                      }}>
                  </Form.Control>
               </Form.Group>

               <Form.Group controlId='image'>
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                     type='text'
                     placeholder='Enter image url'
                     value={image}
                     onChange={(e) => setImage(e.target.value)}
                  ></Form.Control>
                  <Form.Control
                     className="form-control"
                     type="file"
                     label='Choose File'
                     onChange={uploadFileHandler}
                  ></Form.Control>
                  {uploadingError && <Message variant="danger">{uploadingError}</Message>}
                  {uploading && <Loader />}
               </Form.Group>

               <Form.Group controlId="brand" className="py-2">
                  <Form.Label>Brand</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Enter Product Brand"
                     value={brand}
                     required
                     onChange={ (e) => setBrand(e.target.value) }>
                  </Form.Control>
               </Form.Group>
               <Form.Group controlId="category" className="py-2">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Enter Product Category"
                     value={category}
                     required
                     onChange={ (e) => setCategory(e.target.value) }>
                  </Form.Control>
               </Form.Group>
               <Form.Group controlId="countInStock" className="py-2">
                  <Form.Label>Number of Items In-Stock</Form.Label>
                  <Form.Control
                     type="number"
                     placeholder="Enter Number of Items In-Stock"
                     min={0}
                     value={countInStock}
                     required
                     onChange={ (e) => {
                        if (e.target.value < 0 ) {
                           e.target.value = 0;
                           setCountInStock(e.target.value)
                        } else {
                           setCountInStock(e.target.value)
                        }
                      }}>
                  </Form.Control>
               </Form.Group>
               <Form.Group controlId="description" className="py-2">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                     type="text"
                     placeholder="Enter Product Description"
                     value={description}
                     onChange={ (e) => setDescription(e.target.value) }>
                  </Form.Control>
               </Form.Group>
               
   
               <Button type="submit" variant="primary" className="mt-3" >
                  Update
               </Button>
            </Form>
            )}
         </FormContainer>
      </>

      )
   }

export default ProductEditScreen;