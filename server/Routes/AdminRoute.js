import express from "express";
import { login } from "../Controller/AdminController.js";
const Adminrouter= express.Router();

Adminrouter.post("/login",login);

export default Adminrouter;