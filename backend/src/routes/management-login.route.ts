import { Request, Response, NextFunction } from "express";
import { Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Joi from "joi";
import userModel from "../models/user.model";
import loginModel from "../models/login.model";
import dashboardTotalsModel from "../models/dashboard-totals.model";
import { User } from "../interfaces/user.interface";
import { LoginRoute } from "./login.route";

export class ManagementLoginRoute extends LoginRoute {
  constructor() {
    super();
    this.path = "/api/management/login";
    this.initializeRoutes();
  }
}
