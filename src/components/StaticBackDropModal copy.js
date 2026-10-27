import React, { useState } from "react";
import { Card, Button, ProgressBar, Table, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ArrowDown, BookOpenIcon } from "lucide-react";

const StaticBackDropModal = ({ alert, setDismissAlertNull, resourceList }) => {

    console.log(resourceList);

    // utils/downloadFile.js

    // const downloadFile = async (resource) => {
    //     try {
    //         const fileUrl = resource?.resourcePath + resource?.resourceName;
    //         const response = await fetch(fileUrl);

    //         if (!response.ok) {
    //             throw new Error("File not found or network error");
    //         }

    //         // Convert response to Blob
    //         const blob = await response.blob();

    //         // Create a temporary link to download
    //         const url = window.URL.createObjectURL(blob);
    //         const link = document.createElement("a");

    //         link.href = url;
    //         link.download = resource?.resourceName || "download";

    //         document.body.appendChild(link);
    //         link.click();

    //         // Cleanup
    //         link.remove();
    //         window.URL.revokeObjectURL(url);
    //     } catch (error) {
    //         console.error("Download failed:", error);
    //     }
    // };

    const openFileInNewTab = async (resource) => {
        try {

            const fileUrl = `${resource.resourcePath}${resource.resourceName}${resource.resourceExtension}`;
            const response = await fetch(fileUrl);

            if (!response.ok) {
                throw new Error("File not found or network error");
            }

            const blob = await response.blob();
            const contentType = response.headers.get("content-type");

            // Create blob URL
            const fileBlobUrl = URL.createObjectURL(new Blob([blob], { type: contentType }));

            // Open in new tab
            window.open(fileBlobUrl, "_blank");

            // Optional: revoke later after opening
            setTimeout(() => URL.revokeObjectURL(fileBlobUrl), 10000);
        } catch (error) {
            console.error("Failed to open file:", error);
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



    if (!alert) return null;
    return (
        <>
            <div
                className="modal fade show d-block"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="staticBackdropLabel"
                // aria-hidden={!show}
                style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
            >
                <div
                    className="modal-dialog modal-lg modal-dialog-centered"
                    role="document"
                >
                    <div className="modal-content" id="modalContent">
                        <div className="modal-header">
                            <h5 className="modal-title" id="staticBackdropModalLabel">
                                {alert.message}
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                onClick={setDismissAlertNull}
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="modal-body" id="addEditDeleteModalBody">
                            <Table
                                bordered
                                hover
                                responsive
                                className="align-middle shadow-sm rounded custom-table"
                            >

                                <thead className="table-dark text-white">
                                    <tr>
                                        <th>S.No</th>
                                        {/* <th>Contact Person</th> */}
                                        <th>Resource Name</th>
                                        <th style={{display: "none"}}>Resource Type</th>
                                        <th style={{display: "none"}}>Resource Path</th>
                                        <th>Extension</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>

                                    {Array.isArray(resourceList) && resourceList.length > 0 ? (
                                        resourceList.map((resource, i) => (
                                            resource && (   // check resource is not null/undefined
                                                <tr key={resource.resourceId} className="table-row-hover">
                                                    <td>{i + 1}</td>
                                                    <td style={{width: "300px"}}>{resource.resourceName}</td>
                                                    <td style={{display: "none"}}>{resource.resourceType}</td>
                                                    <td style={{display: "none"}}>{resource.resourcePath}</td>
                                                    <td>{resource.resourceExtension}</td>
                                                    <td style={{ width: "200px" }}>
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <Button
                                                                variant="outline-primary d-flex justify-content-between"
                                                                size="sm"
                                                                type="submit"
                                                                style={{ width: "100px", height: "30px", flexShrink: 0 }}
                                                                onClick={() => downloadFile(resource)}

                                                            >
                                                                <ArrowDown /> Download

                                                            </Button>
                                                        </div>
                                                    </td>
                                                    <td style={{ width: "200px" }}>
                                                        <div className="d-flex justify-content-center align-items-center">
                                                            <Button
                                                                variant="outline-secondary d-flex justify-content-between"
                                                                size="sm"
                                                                type="submit"
                                                                style={{ width: "120px", height: "30px", flexShrink: 0 }}
                                                                onClick={() => openFileInNewTab(resource)}

                                                            >
                                                                <BookOpenIcon /> Open File

                                                            </Button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            )
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="10" className="text-center">
                                                No Resource available
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        </div>

                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-success"
                                onClick={setDismissAlertNull}
                                id="submit"
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default StaticBackDropModal;
