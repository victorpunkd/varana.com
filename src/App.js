import React, { Component } from "react";
import "./App.css";
import Logo from "./Logo/Logo";
//import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import AboutUs from "./AboutUs/AboutUs";
import LoginSignup from "./LoginSignup/LoginSignup";
import CreateAccount from "./CreateAccount/CreateAccount";
import Home from "./Home/Home";
import ProductShow from "./ProductShow/ProductShow";
import Cart from "./Cart/Cart";
import PlaceOrder from "./PlaceOrder/PlaceOrder";
import ContactUs from "./ContactUs/ContactUs";
import Loader from "./Loader/Loader";
import AccountOptions from "./AccountOptions/AccountOptions";
import AccountManagement from "./AccountManagement/AccountManagement";
import AddressManagement from "./AddressManagement/AddressManagemnet";
import OrderConfirm from "./OrderConfirm/OrderConfirm";
import OrderTrack from "./OrderTrack/OrderTrack";
import OrderTrackDetails from "./OrderTrackDetails/OrderTrackDetails";
import Modal from "./Modal/Modal";
import ForgetPassword from "./ForgetPassword/ForgetPassword";
import Favourites from "./Favourites/Favourites";
import SpecialMessage from "./SpeicalMessage/SpecialMessage";

export class App extends Component {
  constructor() {
    super();
    this.state = {
      activeSection: "Loader",
      productShow: false,
      modal: false,
      modalMessage: "",
      productShowId: "",
      lastActiveSection: "",
      isLoaded: false,
      cart: [],
      cartWithSize: [],
      cartProductDetails: [],
      totalCartAmount: 0,
      deliveryAddress: [],
      paymentOption: "",
      orderTrackDetails_orderId: "",
      accountOptionShow: false,
      loginForShop: false,
      sexUnderHome: 0,
      isSideBarVisible: false,
      currentBackgroundImage:
        "https://s3.ap-south-1.amazonaws.com/varana.com-files/static-images/heroImages/homeBackgroundDhaka.webp",
    };
    this.tempCartDetails = [];
  }

  componentDidMount() {
    this.setState({ activeSection: "Home" }); /*by default Home */
  }

  //Header handles start

  handleSideBarIconClick = () => {
    this.setState({ isSideBarVisible: !this.state.isSideBarVisible });
  };

  handleLogoClick = () => {
    this.setState({
      activeSection: "Home",
      sexUnderHome:
        this.state.activeSection === "Home" ? this.state.sexUnderHome : 0,
    });
  };

  handleCartIconClick = () => {
    if (this.state.cart.length <= 0) {
      this.setState({ modal: true, modalMessage: "Cart is empty" });
      return;
    }
    this.setState({ lastActiveSection: this.state.activeSection });
    this.setState({ activeSection: "Cart" });
  };

  handleUserIconClick = () => {
    if (localStorage.getItem("loggedInUserPhoneNo") != null) {
      this.setState({ accountOptionShow: !this.state.accountOptionShow });
    } else this.setState({ activeSection: "LoginSignup" });
  };

  //Header handle end

  //User profile handle start

  handleLogoutClick = () => {
    localStorage.removeItem("loggedInUserPhoneNo");
    this.setState({ modal: true, modalMessage: "You have been logged out" });
    this.setState({
      accountOptionShow: false,
      activeSection: "LoginSignup",
      cart: [],
    });
  };

  handleMyAccountClick = () => {
    this.setState({
      activeSection: "AccountManagement",
      accountOptionShow: false,
    });
  };

  handleUserLoggedIn = () => {
    if (localStorage.getItem("loggedInUserPhoneNo") != null) {
      if (this.state.loginForShop === true) {
        this.setState({ activeSection: "PlaceOrder" });
        this.setState({ loginForShop: false });
        return;
      }
      this.handleLogoClick();
    }
  };

  handleCreateAccountDone = () => {
    if (localStorage.getItem("loggedInUserPhoneNo") != null) {
      this.handleLogoClick();
    }
  };

  handleCreateAccountClick = () => {
    this.setState({ activeSection: "CreateAccount" });
  };

  handleForgetPasswordClick = () => {
    this.setState({ activeSection: "ForgetPassword" });
  };

  handleUserExistFromForgetPassword = (phone_no, isUserExist) => {
    if (isUserExist) {
      localStorage.setItem("loggedInUserPhoneNo", phone_no);
      this.setState({ activeSection: "AccountManagement" });
    } else {
      alert(
        "It seems like you dont have a account with us please create an account"
      );
      this.setState({ activeSection: "CreateAccount" });
    }
  };

  handleManageOrdersClick = () => {
    this.setState({
      activeSection: "OrderTrack",
      accountOptionShow: false,
    });
  };

  handleManageAddressClick = () => {
    this.setState({
      activeSection: "AddressManagement",
      accountOptionShow: false,
    });
  };

  handleFavouritesClick = () => {
    this.setState({
      activeSection: "Favourites",
      accountOptionShow: false,
    });
  };

  //User profile handle end

  //Home handle start

  handleCategoryChange = (category) => {
    if (category === "khaasto") {
      this.setState({
        currentBackgroundImage:
          "https://s3.ap-south-1.amazonaws.com/varana.com-files/static-images/heroImages/homeBackgroundKhasto.webp",
      });
    } else if (category === "dhaka") {
      this.setState({
        currentBackgroundImage:
          "https://s3.ap-south-1.amazonaws.com/varana.com-files/static-images/heroImages/homeBackgroundDhaka.webp",
      });
    } else if (category === "accessories") {
      this.setState({
        currentBackgroundImage:
          "https://s3.ap-south-1.amazonaws.com/varana.com-files/static-images/heroImages/homeBackgroundAccessories.webp",
      });
    }
  };

  handleProductClick = (productId) => {
    this.setState({
      productShow: true,
      productShowId: productId,
    });
  };

  handleProductCloseClick = () => {
    this.setState({ productShow: false });
  };

  handleAddProductToCartClick = (product_id, size) => {
    this.setState({
      modal: true,
      modalMessage: `${size} size item added to cart`,
    });
    this.setState({ cart: [product_id, ...this.state.cart] });
    let tempCartDetails = [...this.state.cartWithSize];
    tempCartDetails.push({ product_id: product_id, size: size });
    this.setState({ cartWithSize: tempCartDetails });
  };

  handleSexUnderHomeClick = (sex) => {
    this.setState({ sexUnderHome: sex });
  };

  //Home handle end

  //Cart handle start

  handleCartCloseClick = () => {
    if (this.state.lastActiveSection === "Home") {
      this.handleLogoClick();
    } else
      this.setState({
        activeSection: this.state.lastActiveSection,
      });
  };

  handleShopNowClick = (totalAmount, data) => {
    this.setState({ totalCartAmount: totalAmount });
    if (localStorage.getItem("loggedInUserPhoneNo") != null) {
      if (totalAmount > 0)
        this.setState({
          activeSection: "PlaceOrder",
          cartProductDetails: data,
        });
      else
        this.setState({
          modal: true,
          modalMessage: "Total value of the cart is 0",
        });
    } else {
      this.setState({
        modal: true,
        modalMessage: "Please Log In or Sign Up to continue",
      });
      this.setState({ activeSection: "LoginSignup" });
      this.setState({ loginForShop: true });
    }
  };

  handlePlusButtonClicked = (product_id, size) => {
    this.setState({ cart: [product_id, ...this.state.cart] });
    let tempCartDetails = [...this.state.cartWithSize];
    tempCartDetails.push({ product_id: product_id, size: size });
    this.setState({ cartWithSize: tempCartDetails });
  };

  handleMinusButtonClicked = (product_id, size) => {
    let indexToBeRemoved = this.state.cart.indexOf(product_id);
    let copyOfCart = [...this.state.cart];
    if (indexToBeRemoved > -1) {
      copyOfCart.splice(indexToBeRemoved, 1);
    }
    this.setState({ cart: copyOfCart });
    let copyOfCartDetails = [...this.state.cartWithSize];
    for (let i = 0; i < copyOfCartDetails.length; i++) {
      if (
        copyOfCartDetails[i].product_id === product_id &&
        copyOfCartDetails[i].size === size
      ) {
        copyOfCartDetails.splice(i, 1);
        break;
      }
    }
    this.setState({ cartWithSize: copyOfCartDetails });
  };

  handleRemoveButtonClicked = (product_id) => {
    let copyOfCart = [...this.state.cart];
    for (let i = 0; i < copyOfCart.length; i++) {
      if (copyOfCart[i] === product_id) {
        copyOfCart.splice(i, 1);
        i--;
      }
    }
    this.setState({ cart: copyOfCart });
  };

  //Cart handle close

  //Modal handle start

  handleCloseModalClick = () => {
    this.setState({ modal: false });
  };

  //Modal handle end

  handlePlaceOrder = (defaultAddress, paymentOption) => {
    this.setState({
      activeSection: "OrderConfirm",
      deliveryAddress: defaultAddress,
      paymentOption: paymentOption,
    });
  };

  handleEditAddressClick = () => {
    this.setState({ activeSection: "AddressManagement" });
  };

  handleOrderConfirmed = () => {
    this.setState({ cart: [], cartWithSize: [] });
  };

  handleTrackOrderClick = () => {
    this.setState({ activeSection: "OrderTrack" });
  };

  handleOrderDetailsClick = (orderID) => {
    this.setState({
      activeSection: "OrderTrackDetails",
      orderTrackDetails_orderId: orderID,
    });
  };

  handleContactUsClick = () => {
    this.setState({ activeSection: "ContactUs" });
  };

  handleAboutClick = () => {
    this.setState({ activeSection: "AboutUs" });
  };

  render() {
    return (
      <div
        className="app"
        style={{
          backgroundImage: `${
            this.state.activeSection === "Home" && this.state.sexUnderHome === 0
              ? `url('${this.state.currentBackgroundImage}')`
              : ""
          }`,
        }}
      >
        {this.state.productShow && (
          <ProductShow
            productId={this.state.productShowId}
            productCloseClicked={this.handleProductCloseClick}
            addProductToCartClicked={this.handleAddProductToCartClick}
          />
        )}

        {this.state.modal && (
          <Modal
            closeModalClicked={this.handleCloseModalClick}
            message={this.state.modalMessage}
          />
        )}
        {this.state.activeSection !== "PlaceOrder" && (
          <SpecialMessage
            color={
              this.state.activeSection === "Home" &&
              this.state.sexUnderHome === 0
                ? "white"
                : "#B4252D"
            }
          />
        )}
        <Header
          color={
            this.state.activeSection === "Home" && this.state.sexUnderHome === 0
              ? "white"
              : "#B4252D"
          }
          userIconClicked={this.handleUserIconClick}
          cartIconClicked={this.handleCartIconClick}
          sideBarIconClicked={this.handleSideBarIconClick}
          noOfItems={this.state.cart.length}
        />

        {this.state.accountOptionShow && (
          <AccountOptions
            logoutClicked={this.handleLogoutClick}
            myAccountClicked={this.handleMyAccountClick}
            manageAddressClicked={this.handleManageAddressClick}
            manageOrdersClicked={this.handleManageOrdersClick}
            favouritesClicked={this.handleFavouritesClick}
          />
        )}

        <div className="body">
          {
            /*this.state.activeSection !== "Home" &&*/
            (this.state.activeSection === "Home"
              ? this.state.sexUnderHome !== 0
                ? true
                : false
              : true) && <Logo logoClicked={this.handleLogoClick} />
          }

          {this.state.activeSection === "Loader" && <Loader />}
          {this.state.activeSection === "AboutUs" && <AboutUs />}
          {this.state.activeSection === "LoginSignup" && (
            <LoginSignup
              userLoggedIn={this.handleUserLoggedIn}
              createAccoutClicked={this.handleCreateAccountClick}
              forgetPasswordClicked={this.handleForgetPasswordClick}
            />
          )}
          {this.state.activeSection === "ForgetPassword" && (
            <ForgetPassword
              handleIsUserExist={this.handleUserExistFromForgetPassword}
            />
          )}
          {this.state.activeSection === "CreateAccount" && (
            <CreateAccount createAccountDone={this.handleCreateAccountDone} />
          )}
          {this.state.activeSection === "AccountManagement" && (
            <AccountManagement />
          )}
          {this.state.activeSection === "AddressManagement" && (
            <AddressManagement />
          )}
          {this.state.activeSection === "Favourites" && (
            <Favourites productClicked={this.handleProductClick} />
          )}
          {this.state.activeSection === "Home" && (
            <Home
              categoryChanged={this.handleCategoryChange}
              productClicked={this.handleProductClick}
              contactUsClicked={this.handleContactUsClick}
              aboutClicked={this.handleAboutClick}
              sexUnderHomeClicked={this.handleSexUnderHomeClick}
              isSideBarVisible={this.state.isSideBarVisible}
            />
          )}
          {this.state.activeSection === "Cart" && (
            <Cart
              cartData={this.state.cart}
              cartDataDetails={this.state.cartWithSize}
              cartCloseClicked={this.handleCartCloseClick}
              shopNowClicked={this.handleShopNowClick}
              plusButtonClicked={this.handlePlusButtonClicked}
              minusButtonClicked={this.handleMinusButtonClicked}
              removeButtonClicked={this.handleRemoveButtonClicked}
            />
          )}

          {this.state.activeSection === "PlaceOrder" && (
            <PlaceOrder
              totalCartAmount={this.state.totalCartAmount}
              cart={this.state.cart}
              placeOrderClicked={this.handlePlaceOrder}
              editAddressClicked={this.handleEditAddressClick}
            />
          )}

          {this.state.activeSection === "OrderTrack" && (
            <OrderTrack orderDetailsClicked={this.handleOrderDetailsClick} />
          )}

          {this.state.activeSection === "OrderTrackDetails" && (
            <OrderTrackDetails
              order_id={this.state.orderTrackDetails_orderId}
            />
          )}

          {this.state.activeSection === "OrderConfirm" && (
            <OrderConfirm
              totalCartAmount={this.state.totalCartAmount}
              cartDetails={this.state.cartProductDetails}
              cartArray={this.state.cart}
              cartWithSize={this.state.cartWithSize}
              deliveryAddress={this.state.deliveryAddress}
              paymentOption={this.state.paymentOption}
              orderConfirmed={this.handleOrderConfirmed}
              trackOrderClicked={this.handleTrackOrderClick}
            />
          )}
          {this.state.activeSection === "ContactUs" && <ContactUs />}
        </div>

        {/*this.state.activeSection === "Home" &&
          this.state.sexUnderHome === 0 && <Footer />*/}
      </div>
    );
  }
}

export default App;
