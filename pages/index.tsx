import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useRouter } from "next/router";
//import Router from "next/router";
import Join from "./../components/join";

function index() {
  return (
    <div>
      <Join />
    </div>
  );
}

export default index;
