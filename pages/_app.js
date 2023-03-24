import "@/styles/globals.css";
import App from "next/app";
import Modal from "react-modal";

Modal.setAppElement("#__next");

class MyApp extends App {
  componentDidMount() {
    Modal.setAppElement("#__next");
  }

  render() {
    const { Component, pageProps } = this.props;
    return <Component {...pageProps} />;
  }
}

export default MyApp;
