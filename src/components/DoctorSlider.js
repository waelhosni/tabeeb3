/**
 * ProductSlider Widget
 */
import React, { Component } from 'react';
import Slider from "react-slick";
import { Row, Col, Container } from 'reactstrap';
import { Link } from "gatsby"
import { ToastContainer, toast } from 'react-toastify';
import MaleImg from '../assets/images/male.png'
import FemaleImg from '../assets/images/female.png'
import axios from 'axios'
import Loader from 'react-loader-spinner'
import { withTranslation, Trans } from "react-i18next";


class DoctorSlider extends Component {
    
   
     AddToCart(ProductID,ProductName,ProductImage,Qty,Rate,StockStatus) {
        var Cart = JSON.parse(localStorage.getItem("LocalCartItems"));
        if(Cart == null)
           Cart = new Array();
        let selectedProduct = Cart.find(product => product.ProductName === ProductName);
        if(selectedProduct == null)
        {

           Cart.push({ProductID:ProductID,ProductName:ProductName,ProductImage:ProductImage,Qty:Qty,Rate:Rate,StockStatus:StockStatus});
           localStorage.removeItem("LocalCartItems");
           localStorage.setItem("LocalCartItems",JSON.stringify(Cart));

           toast.success("Item Added to Cart");
        }
        else {
           toast.warning("Item is already in Cart");
        }
     }


      CheckCardItem(ID)
     {
        let checkcart=false;
        var Cart = JSON.parse(localStorage.getItem("LocalCartItems"));
        if(Cart && Cart.length > 0) {
            for (const cartItem of Cart) {
                if (cartItem.ProductID === ID) {
                    checkcart = true
                }
            }
        }
        return checkcart;
    }
     CheckWishList(ID)
    {
        let wishlist=false;
        var Wish = JSON.parse(localStorage.getItem("LocalWishListItems"));

        if(Wish && Wish.length > 0) {
            for (const wishItem of Wish) {
                if (wishItem.ProductID === ID) {
                    wishlist = true
                }
            }
        }
        return wishlist;
    }

      AddToWishList(ProductID,ProductName,ProductImage,Qty,Rate,StockStatus) {
        var Cart = JSON.parse(localStorage.getItem("LocalWishListItems"));
        if(Cart == null)
           Cart = new Array();

           let selectedProduct = Cart.find(product => product.ProductID === ProductID);
           if(selectedProduct == null)
           {

             Cart.push({ProductID:ProductID,ProductName:ProductName,ProductImage:ProductImage,Qty:Qty,Rate:Rate,StockStatus:StockStatus});
              localStorage.removeItem("LocalWishListItems");
              localStorage.setItem("LocalWishListItems",JSON.stringify(Cart));

              toast.success("Item Added to WishList");
           }
           else {
              toast.warning("Item is already in WishList");
           }


     }

    
     rating(productrat)
     {
        let rat=[];  
        productrat = (!productrat||productrat==0)?5:productrat;
        let i = 1;
        while (i <= 5) {
              if(i<=productrat)
              {
                    rat.push(<i className="fa fa-star" />);
              }
              else
              {
                    rat.push(<i className="fa fa-star-o" />);
              }
              i += 1;
        }
        return rat;
     }


     constructor(props) {
        super(props);
     
        this.state = {
         
           DoctorList: [],
           isLoading: true,
            error: null,
        };
      }

     GetDoctors (){
 
        axios.get('https://api.tabeeboman.com/TabebApi/DoctorNew/getTopDoctor?',
        {
            params: {
            patientId:'',
            }
        }
        )
    
      .then(response => {
       
       
        this.setState({ 
        DoctorList:response.data.TopDoctors,
        isLoading: false })})
            
        .catch(error => this.setState({ error, isLoading: false }));
    
}




componentDidMount(){

this.GetDoctors();
    
}
render(){

    
    const DoctorImgPath='https://admin.tabeeboman.com/Documents/DoctorPictures/100X100/';
    const FlagsImgPath='https://admin.tabeeboman.com/Documents/Flags/';
    const settings = this.props.settings;
    const { DoctorList, isLoading } = this.state;
    const { t ,i18n} = this.props;
    const classStyle=(i18n.language.toString()==='ar'?'ar':'en')
    if (isLoading) {
        return ( 
    
    
    <div className="loader-wrapper-section ">
        <Loader type="Puff" color="#d89044"/>
        
        </div>
        
        )
    }

    return (
        <Col sm={12}>
            <ToastContainer autoClose={1000} />
            <div className="products-listing-items-wrapper products-listing-carousel">
                <div className="products" data-nav-arrow="false" data-items={4} data-md-items={3} data-sm-items={3} data-xs-items={2} data-xx-items={1} data-space={20}>
                    <Slider {...settings} className="slider-spacing-10 slider-arrow-hover">
                            {DoctorList.map((product,index) =>

                            <div>
                                <div className="item">
                                    <div className="product product_tag-black product-hover-style-default product-hover-button-style-dark product_title_type-single_line product_icon_type-line-icon">
                                        <div className="product-inner element-hovered">
                                            <div className="product-thumbnail">
                                                <div className="product-thumbnail-inner">
                                                <Link to="/DoctorDetail" 
                                                                     state={{DoctorId:product.DoctorId,SpecializationName:product.MainSpecializationName}} >
                                                                <div className="product-thumbnail-main">
                                                                    <img src={product.ImageData?DoctorImgPath+product.ImageData:product.GenderName=='Male'?MaleImg:FemaleImg} alt={product.DoctorName} className="img-fluid doctor-home-slider-img" />
                                                                </div>
                                                                
                                                        
                                                            {product.OtherImages ?
                                                                <div className="product-thumbnail-swap">
                                                                    <img src={product.ImageData?DoctorImgPath+product.ImageData:product.GenderName=='Male'?MaleImg:FemaleImg} 
                                                                    alt={product.DoctorName} className="img-fluid doctor-home-slider-img" />
                                                                </div>
                                                                :
                                                                null
                                                            }



                                                        
                                                   </Link>
                                                </div>

                                                <div className="product-actions">
                                                    <div className="product-actions-inner">
                                                        <div className="product-action product-action-add-to-cart">
                                                               {
                                                                     <Link to="/DoctorDetail" 
                                                                     state={{DoctorId:product.DoctorId,SpecializationName:product.MainSpecializationName}} >
                                                                        {t("Book")}</Link>
                                                                
                                                                }
                                                        </div>
                                                       
                                                    </div>
                                                </div>
                                            </div>

                                            {/* ,LH.HospitalName 
                                            ,LH.HospitalNameAr
                                                ,LW.WilayatId AS AreaId
                                            ,LW.WilayatName AS AreaName
                                            ,LW.WilayatNameAr AS AreaNameAr
                                            
                                            ,LR.RegionId
                                            ,LR.RegionName
                                            ,LR.RegionNameAr */}
                                            <div className={"product-info product-info1 "+classStyle} style={{textAlign:'initial'}}>
                                                <span className="TabeebOman-product-category">
                                                    {product[t("MainSpecializationName")]}
                                                </span>
                                                
                                               
                                                <h3 className="product-name">
                                                <Link to="/DoctorDetail" 
                                                    state={{DoctorId:product.DoctorId,SpecializationName:product.MainSpecializationName}} >
                                                    {product[t("DoctorName")]}
                                                    </Link>
                                                </h3>
                                                <span className="region-product-category">
                                                    {product[t("HospitalName")]}
                                                </span>
                                                <div className="product-rating">{this.rating(product.ReviewAvg)}</div>
                                               
                                                <div className="product-details__short-description">
                                                    <p>
                                                    {product[("WilayatName")]} - {product[("RegionName")]}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                           
                            </div>
                        )}


                      </Slider>
                </div>
            </div>
            
    </Col>

    )}


}
//export default DoctorSlider;
export default withTranslation("translations")(DoctorSlider);


