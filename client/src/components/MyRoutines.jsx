import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { userRoutines } from "../api/users";
import styles from "../styles/Routines.module.css";
import { Link } from "react-router-dom";
import { NavItem } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";

export default function MyRoutine() {
  const Navigate = useNavigate();
  return (
    <Nav.Item>
      <Link to="CreateRoutine"> Create Routine </Link>
    </Nav.Item>
  );
}
