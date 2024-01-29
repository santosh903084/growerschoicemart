
import { formatDate } from "../utils/authUtils";
/**
 * User Database can be added here.
 * You can add default users of your wish with different attributes
 * Every user will have cart (Quantity of all Products in Cart is set to 1 by default), wishList by default
 * */

export const users = [
  {
    _id: 1,
    firstName: "Test",
    lastName: "Account",
    email: "test@gmail.com",
    password: "test@123",
    createdAt: formatDate(),
    updatedAt: formatDate(),
  },
{
  _id: 2,
    firstName: "Santosh",
    lastName: "V",
    email: "santosh@gmail.com",
    password: "123456789",
    createdAt: formatDate(),
    updatedAt: formatDate(),
}

];
