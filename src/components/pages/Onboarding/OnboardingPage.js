import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./OnboardingPage.css"; // Create this CSS file for styling

const OnboardingPage = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(0);

    // Define the content for each onboarding step
    const steps = [
        {
            title: "Welcome to Scooter Rental App!",
            description: "Rent and track scooters easily with our app.",
            image: "/images/onboarding1.png",
        },
        {
            title: "Real-time Tracking",
            description: "View your scooter's location and battery status in real-time.",
            image: "/images/onboarding2.png",
        },
        {
            title: "Secure Payments",
            description: "Easily manage your rental payments and subscriptions.",
            image: "/images/onboarding3.png",
        },
        {
            title: "Geofencing Alerts",
            description: "Stay within predefined zones to ensure a smooth ride.",
            image: "/images/onboarding4.png",
        },
    ];

    // Navigate to the main app after finishing onboarding
    const handleFinish = () => {
        localStorage.setItem("hasSeenOnboarding", "true");
        navigate("/login");
    };

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            handleFinish();
        }
    };

    const handleSkip = () => {
        handleFinish();
    };

    return (
        <div className="onboarding-container">
            <img src={steps[currentStep].image} alt={steps[currentStep].title} className="onboarding-image" />
            <h2>{steps[currentStep].title}</h2>
            <p>{steps[currentStep].description}</p>
            <div className="onboarding-buttons">
                <button onClick={handleSkip}>Skip</button>
                <button onClick={handleNext}>{currentStep < steps.length - 1 ? "Next" : "Finish"}</button>
            </div>
        </div>
    );
};

export default OnboardingPage;
