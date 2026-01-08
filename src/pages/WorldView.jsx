import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CribWorld from "../components/CribWorld";

export default function WorldView() {
  const { worldId } = useParams();
  const [world, setWorld] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api
