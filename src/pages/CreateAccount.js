import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import {
    BriefcaseBusiness,
    User,
    Building2,
    Mail,
    Lock,
    Phone,
    Eye,
    EyeOff,
} from "lucide-react";
import backgroundImg from "../images/loginBackground.jpg";
const BASE_URL = process.env.REACT_APP_BASE_URL;

const CreateAccount = () => {

    console.log("BASE URL:", BASE_URL);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [accountType, setAccountType] = useState("CANDIDATE");
    const [loading, setLoading] = useState(true);
    const [role, setRole] = useState("");
    const [department, setDepartment] = useState("");
    const [designation, setDesignation] = useState("");
    const [employeeId, setEmployeeId] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("")
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [contact, setContact] = useState("")
    const [dateOfJoining, setDateOfJoining] = useState("")
    const [dateOfLeaving, setDateOfLeaving] = useState("")
    const [userStatus, setUserStatus] = useState("")
    const [roleTypes, setRoleTypes] = useState([]);
    const [departmentTypes, setDepartmentTypes] = useState([]);
    const designationTypes = ["Inventory Manager", "Project Manager", "Senior Software Engineer", "System Engineer", "Software Engineer", "Graduate Engineer Trainee"];
    const titleTypes = ["Mr.", "Mrs", "Miss", "Ms."];
    const userTypes = ["Enable", "Disable"];
    const [error, setError] = useState("");
    // const { setAlert } = useOutletContext();
    const location = useLocation();
    const { dataObject } = location.state || {};
    const [selectedImage, setSelectedImage] = useState(null); // real File
    const [previewUrl, setPreviewUrl] = useState(null);
    const [image, setImage] = useState(null);     // preview

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setSelectedImage(file); // 👈 real File object
            setPreviewUrl(URL.createObjectURL(file)); // 👈 preview blob URL
        } else {
            alert("Please Select a JPG and PNG image.");
        }
    };

    useEffect(() => {
        // loadRoleData();
        // loadDepartmentData();
        if (dataObject) {
            setRole(dataObject.role.roleName || "");
            setEmployeeId(dataObject.employeeId || "");
            setDesignation(dataObject.designation || "");
            setTitle(dataObject.title || "");
            setName(dataObject.firstName || "");
            setEmail(dataObject.email || "");
            setContact(dataObject.contact || "");
            setDateOfLeaving(dataObject.dateOfLeaving || "");
            setDateOfJoining(dataObject.dateOfJoining || "");
            setUserStatus(dataObject.userStatus || "");
            setPreviewUrl(dataObject.image || "");
            setImage(dataObject.image || "")
        }
        setLoading(false);
    }, [dataObject]);

    const resetForm = async (e) => {
        setRole("");
        setEmployeeId("");
        setDesignation("");
        setTitle("");
        setName("");
        setEmail("");
        setPassword("");
        setContact("");
        setDateOfLeaving("");
        setDateOfJoining("");
        setUserStatus("");
        setPreviewUrl("");
        setImage("");
    }

    const loadRoleData = async () => {
        const response = await axios.get(
            BASE_URL + "/user/getAllRoleInList",
            { withCredentials: true, } // 🚨 This ensures browser stores cookie 
        );
        setRoleTypes(response.data);
    };

    const loadDepartmentData = async () => {
        const response = await axios.get(
            BASE_URL + "/user/getAllDepartmentInList",
            { withCredentials: true, } // 🚨 This ensures browser stores cookie 
        );
        setDepartmentTypes(response.data);
    };




    const handleUploadAndSubmit = async (e) => {
        e.preventDefault();
        try {

            if (!selectedImage) {
                // alert("Please select an image first!");
                await handleSubmitForm(e);
                return;
            } else {

                const imageData = new FormData();
                imageData.append("image", selectedImage);

                const response = await axios.post(
                    BASE_URL + "/user/uploadImage",
                    imageData,
                    { headers: { "Content-Type": "multipart/form-data" } }
                );
                alert("Image uploaded successfully!");

                // ✅ Directly pass the uploaded image name/path
                await handleSubmitForm(e, response.data);
                return;
            }

        } catch (error) {
            console.error("Error uploading:", error);
        }
    };


    const isBlankOrSpaces = (value = "") =>
        value.trim().length === 0;

    const handleSubmitForm = async (e) => {
        e.preventDefault();

        if (
            isBlankOrSpaces(name) ||
            isBlankOrSpaces(email) ||
            isBlankOrSpaces(contact) ||
            isBlankOrSpaces(password)
        ) {
            alert("Please fill required column");
            return;
        }

        const data = {
            firstName: name,
            email: email,
            password: password,
            contact: contact,
            createdBy: name
        };

        try {
            const url = dataObject
                ? BASE_URL + "/user/editLoginMaster"
                : BASE_URL + "/user/insertLoginMaster";

            const response = await axios.post(url, data, {
                withCredentials: true
            });

            console.log("Full response:", response);
            console.log("Response data:", response?.data?.message);

            alert("Success : " + response?.data?.message);

            resetForm();

        } catch (err) {

            console.log("Full error:", err);
            console.log("Backend response:", err.response);
            console.log("Backend message:", err.response?.data);

            alert("Error : " + err?.response?.data);
        }
    };


    return (
        <div
            className="d-flex align-items-center justify-content-center min-vh-100 py-4"
            style={{
                backgroundImage: `url(${backgroundImg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                position: "relative",
            }}
        >
            {/* Dark Overlay */}
            <div
                className="position-absolute top-0 start-0 w-100 h-100"
                style={{
                    backgroundColor: "rgba(0, 0, 0, 0.45)",
                    zIndex: 0,
                }}
            ></div>

            {/* Main Card */}
            <div
                className="row shadow-lg rounded-4 overflow-hidden bg-white position-relative"
                style={{
                    width: "90%",
                    maxWidth: "1000px",
                    zIndex: 1,
                }}
            >
                {/* ================= LEFT SIDE ================= */}
                <div
                    className="col-12 col-md-5 d-flex flex-column justify-content-center align-items-center text-white p-4 p-md-5"
                    style={{
                        background: "linear-gradient(135deg, #2563eb, #1e40af)",
                    }}
                >
                    <div
                        className="d-flex align-items-center justify-content-center rounded-circle mb-4"
                        style={{
                            width: "80px",
                            height: "80px",
                            backgroundColor: "rgba(255,255,255,0.15)",
                        }}
                    >
                        <BriefcaseBusiness size={42} />
                    </div>

                    <h2 className="fw-bold text-center mb-3">
                        Start Your Career Journey
                    </h2>

                    <p
                        className="text-center"
                        style={{
                            maxWidth: "300px",
                            lineHeight: "1.6",
                            opacity: 0.9,
                        }}
                    >
                        Create your account and connect with the right opportunities.
                        Whether you're looking for a job or hiring talent, we've got you
                        covered.
                    </p>

                    <div
                        className="mt-4"
                        style={{
                            maxWidth: "300px",
                            width: "100%",
                        }}
                    >
                        <div className="d-flex align-items-center mb-3">
                            <User size={20} className="me-3" />
                            <span>Build your professional profile</span>
                        </div>

                        <div className="d-flex align-items-center mb-3">
                            <BriefcaseBusiness size={20} className="me-3" />
                            <span>Discover career opportunities</span>
                        </div>

                        <div className="d-flex align-items-center">
                            <Building2 size={20} className="me-3" />
                            <span>Connect with companies</span>
                        </div>
                    </div>
                </div>

                {/* ================= RIGHT SIDE ================= */}
                <div className="col-12 col-md-7 p-4 p-md-5">
                    <div className="text-center mb-4">
                        <h2 className="fw-bold text-dark mb-2">
                            Create Account
                        </h2>

                        <p className="text-muted mb-0">
                            Join our job portal today
                        </p>
                    </div>

                    {/* Account Type */}
                    <div className="mb-4">
                        <label className="form-label fw-semibold">
                            Account Type
                        </label>

                        <div className="row g-2">
                            {/* Candidate */}
                            <div className="col-6">
                                <button
                                    type="button"
                                    className={`btn w-100 py-3 ${accountType === "CANDIDATE"
                                        ? "btn-primary"
                                        : "btn-outline-primary"
                                        }`}
                                    onClick={() => setAccountType("CANDIDATE")}
                                >
                                    <User size={20} className="me-2" />
                                    Candidate
                                </button>
                            </div>

                            {/* Recruiter */}
                            <div className="col-6">
                                <button
                                    type="button"
                                    className={`btn w-100 py-3 ${accountType === "RECRUITER"
                                        ? "btn-primary"
                                        : "btn-outline-primary"
                                        }`}
                                    onClick={() => setAccountType("RECRUITER")}
                                >
                                    <Building2 size={20} className="me-2" />
                                    Employer
                                </button>
                            </div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmitForm}>
                        {/* Name */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                {accountType === "CANDIDATE"
                                    ? "Full Name"
                                    : "Contact Person Name"}
                            </label>

                            <div className="input-group">
                                <span className="input-group-text bg-white">
                                    <User size={18} />
                                </span>

                                <input
                                    type="text"
                                    name="name"
                                    className="form-control"
                                    placeholder={
                                        accountType === "CANDIDATE"
                                            ? "Enter your full name"
                                            : "Enter contact person name"
                                    }
                                    value={name}
                                    // onChange={handleChange}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Email */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                Email Address
                            </label>

                            <div className="input-group">
                                <span className="input-group-text bg-white">
                                    <Mail size={18} />
                                </span>

                                <input
                                    type="email"
                                    name="email"
                                    className="form-control"
                                    placeholder="Enter your email"
                                    value={email}
                                    // onChange={handleChange}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                Phone Number
                            </label>

                            <div className="input-group">
                                <span className="input-group-text bg-white">
                                    <Phone size={18} />
                                </span>

                                <input
                                    type="tel"
                                    name="phone"
                                    className="form-control"
                                    placeholder="Enter your phone number"
                                    value={contact}
                                    // onChange={handleChange}
                                    onChange={(e) => setContact(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="mb-3">
                            <label className="form-label fw-semibold">
                                Password
                            </label>

                            <div className="input-group">
                                <span className="input-group-text bg-white">
                                    <Lock size={18} />
                                </span>

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    className="form-control"
                                    placeholder="Create a password"
                                    value={password}
                                    // onChange={handleChange}
                                    onChange={(e) => setPassword(e.target.value)}
                                />

                                <button
                                    type="button"
                                    className="btn btn-outline-secondary"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>


                        {/* Terms */}
                        <div className="form-check mb-4">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="terms"
                                required
                            />

                            <label
                                className="form-check-label text-muted"
                                htmlFor="terms"
                                style={{ fontSize: "0.85rem" }}
                            >
                                I agree to the Terms & Conditions and Privacy Policy.
                            </label>
                        </div>

                        {/* Create Account */}
                        <button
                            type="submit"
                            className="btn btn-primary w-100 py-2 fw-semibold"
                            disabled={loading}
                        >
                            {loading ? "Creating Account..." : "Create Account"}
                        </button>
                    </form>

                    {/* Login */}
                    <div className="text-center mt-4">
                        <span
                            className="text-muted"
                            style={{ fontSize: "0.9rem" }}
                        >
                            Already have an account?{" "}
                        </span>

                        <a
                            href="/auth/loginpage"
                            className="fw-semibold text-decoration-none"
                            style={{ color: "#2563eb" }}
                        >
                            Sign In
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateAccount;
