import React, { Component } from 'react';
import Quagga from 'quagga';
import successSound from '../../utility/sounds/Barcode-scanner-beep-sound.mp3';
import errorSound from '../../utility/sounds/Error-sound.mp3';
class Scanner extends Component {
    audioRef = React.createRef(); // Ref for the audio element
    errorAudioRef = React.createRef();
    coolDown = false; // Flag to track cooldown state
    coolDownTimeout = null; // Timeout reference for cooldown


    componentDidMount() {
        this.startScanning();
    }

    componentWillUnmount() {
        this.stopScanning();
    }

    startScanning = () => {
        const constraints = {
            width: 640,
            height: 320,
            facingMode: 'environment',
        };

        Quagga.init(
            {
                inputStream: {
                    type: 'LiveStream',
                    constraints: constraints,
                },
                locator: {
                    halfSample: true,
                    patchSize: 'large',
                },
                numOfWorkers: 4,
                decoder: {
                    readers: ['ean_reader'],
                },
                locate: true,
            },
            (err) => {
                if (err) {
                    return console.log(err);
                }
                Quagga.start();
            }
        );

        Quagga.onDetected(this.onDetected);
    };


    stopScanning = () => {
        Quagga.offDetected(this.onDetected);
        Quagga.stop();
    };

    onDetected = (result) => {
        if (!this.coolDown) {
            const productFound = this.props.onDetected(result);
            if (productFound) {
                this.playSound(this.audioRef); // Play success sound
            } else {
                this.playSound(this.errorAudioRef); // Play error sound
            }
            this.startCooldown();
        }
    };

    playSound = (audioElement) => {
        audioElement.current.play();
    };

    startCooldown = () => {
        this.coolDown = true;

        this.coolDownTimeout = setTimeout(() => {
            this.coolDown = false;
        }, 1000);
    };

    render() {
        return (
            <div>

                <div id="interactive" className="viewport" />
                <audio ref={this.audioRef} src={successSound} />
                <audio ref={this.errorAudioRef} src={errorSound} />
            </div>
        );
    }
}

export default Scanner;
