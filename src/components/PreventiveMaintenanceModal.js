import React, { useState, useEffect } from "react";
import { Card, Button, ProgressBar, Table, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ArrowDown, BookOpenIcon, Download } from "lucide-react";
import InputField from "./InputFields";
import { Upload } from "react-bootstrap-icons";
import LoadingSpinner from "./LoadingSpinner";
import UploadLoadingSpinner from "./UploadLoadingSpinner";
import axios from "axios";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const PreventiveMaintenanceModal = ({ alert, setDismissAlertNull, uploadUrl, reloadFunction }) => {

    const [uploadLoading, setUploadLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null); // real File
    const [previewUrl, setPreviewUrl] = useState(null);

    const [uploadStatus, setUploadStatus] = useState(null);
    // { type: "success" | "error", message: "" }

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        if (!selectedImage) {
            setUploadStatus({ type: "error", message: "Please select a file." });
            return;
        }

        setUploadLoading(true);
        setUploadStatus(null);

        try {
            const imageData = new FormData();
            imageData.append("file", selectedImage);

            const response = await axios.post(
                BASE_URL + "/WebApplication/Controllers/" + uploadUrl + "/" + "111",
                imageData,
                { headers: { "Content-Type": "multipart/form-data" } }
            );

            setUploadStatus({
                type: "success",
                message: response.data?.message || "Excel uploaded successfully!"
            });

            if (reloadFunction) reloadFunction();

            setTimeout(() => {
                setDismissAlertNull();
            }, 2500);

        } catch (err) {
            setUploadStatus({
                type: "error",
                message:
                    err.response?.data?.message ||
                    "Upload failed. Please check file format."
            });

            setTimeout(() => {
                setDismissAlertNull();
            }, 2500);
        } finally {
            setUploadLoading(false);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file); // 👈 real File object
            setPreviewUrl(URL.createObjectURL(file)); // 👈 preview blob URL
        } else {
            alert("Please Select a JPG and PNG image.");
        }
    };


    const downloadFile = async (resource) => {
        try {
            const fileUrl = `${resource.resourcePath}${resource.resourceName}${resource.resourceExtension}`;

            const response = await fetch(fileUrl, {
                method: "GET"
            });

            if (!response.ok) {
                throw new Error("File not found or network error");
            }

            const contentType = response.headers.get("content-type");
            console.log("Content-Type:", contentType);

            if (contentType && contentType.includes("text/html")) {
                // alert("❌ Server returned HTML instead of file. Check file path or permissions.");
                console.log("Server returned HTML instead of file. Check file path or permissions. ");
                return;
            }

            const blob = await response.blob();

            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");

            link.href = url;
            link.download = resource.resourceName;
            document.body.appendChild(link);
            link.click();

            link.remove();
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };

    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [reports, setReports] = useState({
        stationScore: true,
        trainingHours: false,
        passFail: false,
        monthlyTrend: false,
        lowPerformers: false,
    });

    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setReports(prev => ({
            ...prev,
            [name]: checked
        }));
    };

    useEffect(() => {
        setUploadStatus(null);
    }, [alert]);

    if (!alert) return null;
    return (
        <>
            <div
                className="modal fade show d-block"
                tabIndex="-1"
                role="dialog"
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >

                <div className="modal-dialog modal-lg modal-dialog-centered">
                    <div className="modal-content">
                        {/* Header */}
                        <div className="modal-header bg-light">
                            <h5 className="modal-title">
                                📊 Upload Excel
                            </h5>

                            {!uploadLoading && (
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={setDismissAlertNull}
                                ></button>
                            )}
                        </div>

                        {uploadLoading ? (
                            <UploadLoadingSpinner message={`Loading .....`} />
                        ) : (
                            <div className="modal-body">
                                {uploadStatus && (
                                    <div
                                        className={`alert ${uploadStatus.type === "success"
                                            ? "alert-success"
                                            : "alert-danger"
                                            }`}
                                        role="alert"
                                    >
                                        {uploadStatus.message}
                                    </div>
                                )}

                                <div className="row mb-4">
                                    <div className="col-md-12">
                                        <InputField
                                            label="Image"
                                            type="file"
                                            // accept="image/png, image/jpeg"
                                            // value={customerAddress}
                                            onChange={handleImageChange}
                                        />
                                    </div>
                                </div>


                            </div>


                        )}



                        {/* Footer */}
                        <div className="modal-footer">
                            {/* <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={setDismissAlertNull}
                            >
                                Cancel
                            </button> */}

                            {!uploadLoading && (
                                <button
                                    type="button"
                                    className="btn btn-success px-4"
                                    onClick={handleSubmitForm}
                                >
                                    <Upload className="me-1" />
                                    <span className="d-lg-inline me-1">Upload Excel</span>
                                </button>
                            )}

                            {uploadLoading && (
                                <h4 className="bg-danger text-white w-100 px-3 text-center"
                                > Please don't close the window while upload an excel!
                                </h4>
                            )}
                        </div>
                    </div>
                </div>


            </div>
        </>
    );
}

export default PreventiveMaintenanceModal;
