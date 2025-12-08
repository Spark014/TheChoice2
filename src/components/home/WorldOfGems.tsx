"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { X, Hand, MoveHorizontal } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// === Mining locations ===
const MINES = [
    {
        name: "Sapphire Mine – Sri Lanka",
        lat: 6.9271,
        lon: 79.8612,
        imageUrl: "https://images.pexels.com/photos/1209843/pexels-photo-1209843.jpeg",
        description: "The 'Gem Island' (Ratnapura), famous for Padparadscha and Royal Blue sapphires.",
    },
    {
        name: "Ruby Mine – Burma (Myanmar)",
        lat: 22.9160,
        lon: 96.5059,
        imageUrl: "https://images.pexels.com/photos/1570260/pexels-photo-1570260.jpeg",
        description: "Mogok Valley, the legendary source of the world's finest 'Pigeon Blood' rubies.",
    },
    {
        name: "Emerald Mine – Colombia",
        lat: 5.5367,
        lon: -74.1120,
        imageUrl: "https://images.pexels.com/photos/1001455/pexels-photo-1001455.jpeg",
        description: "Muzo and Chivor mines produce emeralds of unmatched warmth and intense green color.",
    },
    {
        name: "Sapphire Mine – Madagascar",
        lat: -22.4246,
        lon: 45.2426,
        imageUrl: "https://images.unsplash.com/photo-1615655406736-b37c4fabf923?q=80&w=600&auto=format&fit=crop",
        description: "Ilakaka and Didy mines, known for pink, blue, and fancy colored sapphires.",
    },
    {
        name: "Diamond/Gem Mine – India",
        lat: 17.3850,
        lon: 78.4867,
        imageUrl: "https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600&auto=format&fit=crop",
        description: "Historic Golconda mines and modern sources for diamonds and colored gemstones.",
    },
    {
        name: "Spinels & Rubies – Vietnam",
        lat: 21.7167,
        lon: 104.9000,
        imageUrl: "https://images.unsplash.com/photo-1599643478518-17488fbbcd75?q=80&w=600&auto=format&fit=crop",
        description: "Luc Yen district, famous for vibrant pink spinels and rubies set in white marble.",
    },
    {
        name: "Emeralds & Paraiba – Brazil",
        lat: -19.9167,
        lon: -43.9345,
        imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop",
        description: "Minas Gerais, a powerhouse for emeralds, tourmalines, and the rare Paraiba tourmaline.",
    },
    {
        name: "Emeralds & Peridot – Pakistan",
        lat: 34.7717,
        lon: 72.3600,
        imageUrl: "https://images.unsplash.com/photo-1612862862126-86d35911d8ca?q=80&w=600&auto=format&fit=crop",
        description: "Swat Valley emeralds and Kashmir sapphires, known for high clarity and rich color.",
    },
    {
        name: "Tsavorite & Ruby – Kenya",
        lat: -3.3967,
        lon: 38.5580,
        imageUrl: "https://images.unsplash.com/photo-1596324683478-4a92c80362d5?q=80&w=600&auto=format&fit=crop",
        description: "Home to the scorpion mine for Tsavorite garnets and rubies.",
    },
    {
        name: "Tanzanite – Tanzania",
        lat: -3.5833,
        lon: 37.0500,
        imageUrl: "https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?q=80&w=600&auto=format&fit=crop",
        description: "Merelani Hills, the only source in the world for the violet-blue Tanzanite.",
    },
];

// Convert latitude/longitude to 3D position on sphere
function latLonToVector3(lat: number, lon: number, radius: number) {
    const phi = (90 - lat) * (Math.PI / 180); // latitude
    const theta = (lon + 180) * (Math.PI / 180); // longitude

    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return new THREE.Vector3(x, y, z);
}

export default function WorldOfGems() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [selectedMine, setSelectedMine] = useState<typeof MINES[0] | null>(null);
    const [showHint, setShowHint] = useState(true);
    const controlsRef = useRef<OrbitControls | null>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);

    const [isInteracting, setIsInteracting] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // === Sizes ===
        const width = container.clientWidth;
        const height = container.clientHeight || 800;

        // === Scene, camera, renderer ===
        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0x1A1E26);

        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        const isMobile = width < 768;
        camera.position.set(0, 0, isMobile ? 6.5 : 5); // Start further out, especially on mobile
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        container.appendChild(renderer.domElement);

        // === Lights ===
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 1);
        dirLight.position.set(5, 3, 5);
        scene.add(dirLight);

        const backLight = new THREE.DirectionalLight(0x4C607A, 0.8);
        backLight.position.set(-5, 3, -5);
        scene.add(backLight);

        // === Orbit Controls ===
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enablePan = false;
        controls.enableZoom = !isMobile; // Disable zoom on mobile for a cleaner experience
        controls.minDistance = 2.5;
        controls.maxDistance = 8;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 2.0; // Faster initial spin
        controlsRef.current = controls;

        // === Globe ===
        const RADIUS = 1.8; // Slightly larger
        const textureLoader = new THREE.TextureLoader();

        const earthTextureUrl = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg";
        const bumpMapUrl = "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_normal_2048.jpg";

        const globeGeometry = new THREE.SphereGeometry(RADIUS, 64, 64);
        const globeMaterial = new THREE.MeshPhongMaterial({
            map: textureLoader.load(earthTextureUrl),
            normalMap: textureLoader.load(bumpMapUrl),
            shininess: 15,
            specular: new THREE.Color(0x333333),
        });
        const globe = new THREE.Mesh(globeGeometry, globeMaterial);
        scene.add(globe);

        // Atmosphere glow
        const atmosphereGeometry = new THREE.SphereGeometry(RADIUS + 0.05, 64, 64);
        const atmosphereMaterial = new THREE.MeshPhongMaterial({
            color: 0x4C607A,
            transparent: true,
            opacity: 0.1,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
        });
        const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
        scene.add(atmosphere);

        // === Markers ===
        const markersGroup = new THREE.Group();
        scene.add(markersGroup);
        const markerMaterial = new THREE.MeshBasicMaterial({ color: 0xD4AF37 });

        MINES.forEach((mine) => {
            const markerGeometry = new THREE.SphereGeometry(0.03, 16, 16);
            const marker = new THREE.Mesh(markerGeometry, markerMaterial.clone());
            const pos = latLonToVector3(mine.lat, mine.lon, RADIUS + 0.01);
            marker.position.copy(pos);
            marker.userData = mine;

            const ringGeometry = new THREE.RingGeometry(0.05, 0.06, 32);
            const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xD4AF37, side: THREE.DoubleSide, transparent: true, opacity: 0.6 });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            ring.position.copy(pos);
            ring.lookAt(new THREE.Vector3(0, 0, 0));
            markersGroup.add(ring);

            markersGroup.add(marker);
        });

        // === Raycaster & Interaction Logic ===
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        const pointerStart = new THREE.Vector2();
        let isDragging = false;
        let hoveredMarker: THREE.Object3D | null = null;

        const handlePointerDown = (event: PointerEvent) => {
            isDragging = false;
            pointerStart.set(event.clientX, event.clientY);

            // Visual feedback
            renderer.domElement.style.cursor = 'grabbing';
            setShowHint(false);
            controls.autoRotate = false;
        };

        const handlePointerMove = (event: PointerEvent) => {
            // Check if dragged significantly
            if (!isDragging) {
                const dist = Math.hypot(
                    event.clientX - pointerStart.x,
                    event.clientY - pointerStart.y
                );
                if (dist > 5) {
                    isDragging = true;
                }
            }

            // Cursor update logic
            const rect = renderer.domElement.getBoundingClientRect();
            mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            const intersects = raycaster.intersectObjects(markersGroup.children, true);

            if (intersects.length > 0) {
                renderer.domElement.style.cursor = 'pointer';
                hoveredMarker = intersects[0].object;
            } else {
                renderer.domElement.style.cursor = isDragging ? 'grabbing' : 'grab';
                hoveredMarker = null;
            }
        };

        const handlePointerUp = (event: PointerEvent) => {
            renderer.domElement.style.cursor = 'grab';

            // If it was a click/tap (not a drag)
            if (!isDragging) {
                const rect = renderer.domElement.getBoundingClientRect();
                mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
                mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

                raycaster.setFromCamera(mouse, camera);
                const intersects = raycaster.intersectObjects(markersGroup.children, true);

                if (intersects.length > 0) {
                    const marker = intersects[0];
                    // Traverse up to find the object with userData (in case we hit the ring)
                    let target = marker.object;
                    while (!target.userData || Object.keys(target.userData).length === 0) {
                        if (target.parent) {
                            target = target.parent;
                        } else {
                            break;
                        }
                    }

                    if (target.userData && Object.keys(target.userData).length > 0) {
                        const data = target.userData as typeof MINES[0];
                        setSelectedMine(data);
                        controls.autoRotate = false;
                        setShowHint(false);
                    }
                }
            }
        };

        // Use Pointer Events for unified touch/mouse handling
        const canvas = renderer.domElement;
        canvas.style.touchAction = 'none'; // CSS touch-action handles scroll blocking efficiently
        canvas.addEventListener("pointerdown", handlePointerDown);
        canvas.addEventListener("pointermove", handlePointerMove);
        canvas.addEventListener("pointerup", handlePointerUp);

        // === Resize ===
        const handleResize = () => {
            if (!container) return;
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight || 800;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
        };

        window.addEventListener("resize", handleResize);

        // === Animation Loop ===
        let frameId: number;

        const animate = () => {
            frameId = requestAnimationFrame(animate);
            controls.update();

            // Animate markers
            markersGroup.children.forEach((child) => {
                const targetScale = (child === hoveredMarker || (hoveredMarker && child.userData === hoveredMarker.userData)) ? 1.5 : 1.0;
                child.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
            });

            renderer.render(scene, camera);
        };

        animate();

        return () => {
            cancelAnimationFrame(frameId);

            canvas.removeEventListener("pointerdown", handlePointerDown);
            canvas.removeEventListener("pointermove", handlePointerMove);
            canvas.removeEventListener("pointerup", handlePointerUp);

            window.removeEventListener("resize", handleResize);
            controls.dispose();
            globeGeometry.dispose();
            globeMaterial.dispose();
            renderer.dispose();
            if (container.contains(canvas)) {
                container.removeChild(canvas);
            }
        };
    }, []);

    return (
        <section className="relative w-full min-h-[600px] md:min-h-screen bg-[#1A1E26] flex flex-col items-center pt-24 pb-12 overflow-hidden">

            {/* Top Text Section */}
            <div className="relative z-10 text-center px-6 max-w-4xl mx-auto mb-8 pointer-events-none">
                <span className="text-primary tracking-[0.3em] uppercase text-sm font-bold mb-4 block animate-fade-in">
                    Global Sourcing
                </span>
                <h2 className="text-5xl md:text-7xl font-headline font-medium text-white mb-6 leading-tight drop-shadow-2xl">
                    The World of <span className="italic text-primary">Gems</span>
                </h2>
                <p className="text-xl text-white/70 font-light leading-relaxed max-w-2xl mx-auto drop-shadow-lg">
                    Explore ethical mining locations across the globe.
                </p>
            </div>

            {/* 3D Globe Container */}
            <div className="relative w-full flex-grow min-h-[400px] md:min-h-[600px] flex items-center justify-center">
                <div
                    ref={containerRef}
                    className={`absolute inset-0 z-0 cursor-grab touch-none transition-opacity duration-500 ${isInteracting ? 'opacity-100 pointer-events-auto' : 'opacity-80 pointer-events-none'}`}
                />

                {/* Interaction Overlay (Tap to Explore) */}
                {!isInteracting && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/10 backdrop-blur-[1px]">
                        <Button
                            onClick={() => setIsInteracting(true)}
                            className="bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 px-8 py-6 rounded-full font-headline text-lg tracking-wide transition-all hover:scale-105"
                        >
                            <Hand className="w-5 h-5 mr-3" /> Tap to Explore
                        </Button>
                    </div>
                )}

                {/* Exit Interaction Button */}
                {isInteracting && (
                    <div className="absolute top-4 right-4 z-20">
                        <Button
                            onClick={() => {
                                setIsInteracting(false);
                                setSelectedMine(null);
                                if (controlsRef.current) controlsRef.current.autoRotate = true;
                            }}
                            variant="ghost"
                            size="sm"
                            className="text-white/70 hover:text-white hover:bg-white/10"
                        >
                            <X className="w-5 h-5 mr-2" /> Stop Exploring
                        </Button>
                    </div>
                )}

                {/* Interaction Hint (Only when interacting) */}
                <AnimatePresence>
                    {showHint && isInteracting && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute bottom-12 pointer-events-none flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-3 rounded-full border border-white/20 text-white/90"
                        >
                            <MoveHorizontal className="w-5 h-5 animate-pulse" />
                            <span className="text-sm font-medium tracking-wide">Drag to Rotate & Explore</span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Popup for selected mine */}
                <AnimatePresence>
                    {selectedMine && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 z-50 flex items-end md:items-center justify-center px-0 md:px-4 bg-black/40 backdrop-blur-[2px]"
                            onClick={() => setSelectedMine(null)}
                        >
                            <motion.div
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                                className="w-full md:max-w-md bg-[#F5F5F0] rounded-t-2xl md:rounded-sm overflow-hidden shadow-2xl"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="relative h-48 md:h-64 w-full">
                                    <img
                                        src={selectedMine.imageUrl}
                                        alt={selectedMine.name}
                                        className="object-cover w-full h-full"
                                    />
                                    <button
                                        onClick={() => setSelectedMine(null)}
                                        className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full text-black transition-all shadow-md hover:scale-105"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                                <div className="p-6 md:p-8 text-center">
                                    <span className="text-primary text-xs font-bold tracking-[0.2em] uppercase mb-3 block">
                                        Mining Location
                                    </span>
                                    <h3 className="text-2xl md:text-3xl font-headline font-medium text-[#1A1E26] mb-4 leading-tight">
                                        {selectedMine.name}
                                    </h3>
                                    <div className="w-12 h-[1px] bg-primary/30 mx-auto mb-6" />
                                    <p className="text-muted-foreground font-light leading-relaxed mb-8 text-sm md:text-base">
                                        {selectedMine.description}
                                    </p>
                                    <Button
                                        onClick={() => setSelectedMine(null)}
                                        className="w-full bg-[#1A1E26] text-white hover:bg-[#1A1E26]/90 rounded-none py-4 md:py-6 text-lg font-headline tracking-wide transition-all duration-300"
                                    >
                                        Close Details
                                    </Button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
