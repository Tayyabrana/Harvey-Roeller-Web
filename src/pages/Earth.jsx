import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { useGesture } from 'react-use-gesture';
import * as THREE from 'three';
import {useNavigate} from "react-router-dom";

const Earth = () => {
    const earthRef = useRef();
    const [texture, setTexture] = useState(null);

    const navigate = useNavigate();

    // Load the texture when the component mounts
    useEffect(() => {
        const textureLoader = new THREE.TextureLoader();
        const textureURL =
            'https://www.wallpaperflare.com/static/457/259/824/earth-map-world-wallpaper-preview.jpg';

        textureLoader.load(
            textureURL,
            (loadedTexture) => {
                setTexture(loadedTexture);
            },
            undefined,
            (error) => {
                console.error('Error loading texture:', error);
            }
        );
    }, []);

    // Handle gestures
    const bind = useGesture({
        onDrag: ({ movement: [x, y] }) => {
            if (earthRef.current) {
                earthRef.current.rotation.y += x * 0.001;
                earthRef.current.rotation.x += y * 0.001;
            }
        }
    });

    useEffect(() => {
        const getData = async () => {
            let u = sessionStorage.getItem("USER");
            if (!u) {
                navigate('/', { replace: true })
            }
        };
        getData();
    }, []);

    return (
        <div className="w-full h-screen bg-[#550816] flex justify-center items-center">
            <Canvas className="w-full h-full">
                <ambientLight />
                <pointLight position={[10, 10, 10]} />
                {texture && (
                    <mesh ref={earthRef} {...bind()}>
                        <sphereGeometry args={[2, 32, 32]} />
                        <meshBasicMaterial map={texture} />
                    </mesh>
                )}
                <OrbitControls />
            </Canvas>
        </div>
    );
};

export default Earth;
