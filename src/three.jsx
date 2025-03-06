import React, { useEffect, useRef, useState } from "react";
import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
import Loader from "./components/Loader.jsx";

const Animation = () => {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(true); // Track loading state

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      25,
      window.innerWidth / window.innerHeight,
      1,
      100
    );
    camera.position.set(0, 2, 12);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current?.appendChild(renderer.domElement);

    let object;

    // Load 3D Model
    const loader = new GLTFLoader();
    loader.load(
      "/the_forgotten_knight.glb",
      (gltf) => {
        object = gltf.scene;
        object.scale.set(3.5, 3.5, 3.5);
        object.position.set(0, -7, 0);

        scene.add(object);
        setLoading(false); // Hide loader once model is loaded
      },
      undefined,
      (error) => {
        console.error("Error loading GLTF:", error);
        setLoading(false); // Hide loader in case of error
      }
    );

    // Lights
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 20, 30);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0x888888, 1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 1, 100);
    pointLight.position.set(0, 10, 5);
    scene.add(pointLight);

    const spotLight = new THREE.SpotLight(0xffffff, 0.5);
    spotLight.position.set(15, 40, 35);
    spotLight.angle = Math.PI / 6;
    scene.add(spotLight);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;

    // Animation Loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (object) object.rotation.y += 0.01;
      renderer.render(scene, camera);
    };
    animate();

    // Resize Listener
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <>
      {loading && <Loader />}
      <div id="container3D" ref={containerRef} style={{ display: loading ? "none" : "block" }}></div>
    </>
  );
};

export default Animation;

  // import React, { useEffect, useRef } from "react";
  // import * as THREE from "https://cdn.skypack.dev/three@0.129.0/build/three.module.js";
  // // This is a React component that creates a 3D scene using Three.js
  // import { OrbitControls } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/controls/OrbitControls.js";
  // import { GLTFLoader } from "https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js";
  // import Loader from "./components/Loader.jsx";
  // const Animation = () => {
  //   const containerRef = useRef(null);
    

  //   useEffect(() => {
  //     const scene = new THREE.Scene();
  //     const camera = new THREE.PerspectiveCamera(
  //       25,
  //       window.innerWidth / window.innerHeight,
  //       1,
  //       100
  //     );
  //     // Sets the camera position in 3D space:
  //     // x: 0 (centered horizontally)
  //     // y: 2 (slightly above the scene)
  //     // z: 12 (distance from the scene - higher numbers move camera further back)
  //     camera.position.set(0, 2, 12); // Adjusted camera position

  //     const renderer = new THREE.WebGLRenderer({ alpha: true });
  //     renderer.setSize(window.innerWidth, window.innerHeight);
  //     containerRef.current?.appendChild(renderer.domElement);

  //     let object;

  //     // Load 3D Model
  //     const loader = new GLTFLoader();
  //     loader.load(
  //       "/the_forgotten_knight.glb",
  //       (gltf) => {
  //         object = gltf.scene;
  //         object.scale.set(3.5, 3.5, 3.5); // Scale down model

  //         // This line positions the 3D model in the scene:
  //         // x: Any number - positive moves right, negative moves left
  //         // y: Any number - positive moves up, negative moves down  
  //         // z: Any number - positive moves away from camera, negative moves toward camera
  //         // Example: object.position.set(0, -1, 40) positions model:
  //         // - Centered horizontally (x=0)
  //         // - Slightly below center (y=-1) 
  //         // - 40 units away from camera (z=40)
  //         object.position.set(0, -7,0); // Move model up

  //         scene.add(object);
  //       },
  //       undefined,
  //       (error) => console.error("Error loading GLTF:", error)
  //     );

  // // Dim directional light for subtle highlights
  // const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  // directionalLight.position.set(10, 20, 30);
  // scene.add(directionalLight);

  // // Very soft ambient light for minimal illumination
  // const ambientLight = new THREE.AmbientLight(0x888888, 1);
  // scene.add(ambientLight);

  // // Weak point light for subtle reflections
  // const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  // pointLight.position.set(0, 10, 5);
  // scene.add(pointLight);

  // // Dim spotlight for minimal emphasis
  // const spotLight = new THREE.SpotLight(0xffffff, 0.5);
  // spotLight.position.set(15, 40, 35);
  // spotLight.angle = Math.PI / 6;
  // scene.add(spotLight);

  //     // Controls
  //     const controls = new OrbitControls(camera, renderer.domElement);
  //     controls.enableZoom = false;

  //     // Animation Loop
  //     const animate = () => {
  //       requestAnimationFrame(animate);
  //       if (object) object.rotation.y += 0.01;
  //         renderer.render(scene, camera);
  //     };
  //     animate();

  //     // Resize Listener
  //     const handleResize = () => {
  //       camera.aspect = window.innerWidth / window.innerHeight;
  //       camera.updateProjectionMatrix();
  //       renderer.setSize(window.innerWidth, window.innerHeight);
  //     };

  //     window.addEventListener("resize", handleResize);

  //     return () => {
  //       window.removeEventListener("resize", handleResize);
  //       containerRef.current?.removeChild(renderer.domElement);
  //     };
  //   }, []);

  //   return <div id="container3D" ref={containerRef}></div>;
  // };

  // export default Animation;
