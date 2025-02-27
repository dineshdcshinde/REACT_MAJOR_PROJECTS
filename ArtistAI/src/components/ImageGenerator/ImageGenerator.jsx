import React, { useEffect, useRef, useState } from "react";
import Hero_ArtistAI from "/Hero_ArtistAI.jpg?url";
import "./ImageGenerator.css";

const ImageGenerator = () => {
  const [image_url, setImage_url] = useState(Hero_ArtistAI);
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const imageGenerator = async () => {
    try {
      if (!prompt) return;
      setLoading(true);
      const actualPrompt = prompt.trim();

      let response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_HUGGINGFACE_API_KEY}`,
          },
          body: JSON.stringify({
            inputs: actualPrompt,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Api Error: ", response.statusText);
      }

      // converting that into the blob format as it gave in the binary format
      let blob = await response.blob();
      let imageUrl = URL.createObjectURL(blob);
      setImage_url(imageUrl);
    } catch (error) {
      console.log("Error occuring", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    imageGenerator();
    setPrompt("");
  };

  return (
    <div className="ai-image-generator">
      <div className="header">
        ArtistAI <span>AI GENERATOR</span>
      </div>

      <div className="img-loading">
        {loading ? (
          <div class="image-container">
            <div class="shimmer">
              <div class="loading-message">
                <svg
                  width="50"
                  height="50"
                  viewBox="0 0 50 50"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    cx="25"
                    cy="25"
                    r="20"
                    stroke="#ccc"
                    stroke-width="4"
                    fill="none"
                    stroke-dasharray="80"
                    stroke-dashoffset="60"
                  >
                    <animateTransform
                      attributeType="XML"
                      attributeName="transform"
                      type="rotate"
                      from="0 25 25"
                      to="360 25 25"
                      dur="1s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
                <p>Preparing the image...</p>
              </div>
            </div>
            <div class="image">
              <img src="{image_url}" alt="Generated Image" />
            </div>
          </div>
        ) : (
          <div className="image">
            <img src={image_url} alt="Generated Image" />
            <div className="download"></div>
          </div>
        )}
      </div>

      <div>
        <form className="search-box" onSubmit={handleSubmit}>
          <input
            type="text"
            className="search-input"
            placeholder="Describe What's Your Requirement ?"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <button className="generate-btn">Generate</button>
        </form>
      </div>
    </div>
  );
};

export default ImageGenerator;
