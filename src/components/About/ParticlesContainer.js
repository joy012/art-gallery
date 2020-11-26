import React from 'react';
import Particles from 'react-particles-js';

const ParticlesContainer = () => {

    return (
        <div
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh"
            }}
        >
            <Particles
                params={{
                    "particles": {
                        "number": {
                            "value": 180,
                            "density": {
                                "enable": false
                            }
                        },
                        "size": {
                            "value": 12,
                            "random": true
                        },
                        "move": {
                            "direction": "bottom",
                            "out_mode": "out"
                        },
                        "line_linked": {
                            "enable": false
                        }
                    },
                    "interactivity": {
                        "events": {
                            "onclick": {
                                "enable": true,
                                "mode": "remove"
                            }
                        },
                        "modes": {
                            "remove": {
                                "particles_nb": 8
                            }
                        }
                    }
                }} />

        </div>
    );
};

export default ParticlesContainer;