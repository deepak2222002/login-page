import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  HouseDoorFill,
  ListCheck,
  Calendar3,
  BarChart,
  People,
  Gear,
  QuestionCircle,
  BoxArrowRight,
  List,
  Clipboard,
  PersonLinesFill,
  Kanban,
  Check2Square,
  Person,
  Question,
  QuestionCircleFill,
  Line,
  HddRack,
  Back
} from "react-bootstrap-icons";
import {
  Archive, CheckSquare, ClipboardList, Cpu, Database,
  Factory, GitBranch, LayoutDashboard, ListTodo, MapPin,
  ShieldCheck, WashingMachine, Workflow
} from "lucide-react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/SideBar.css"
import { usePermissionStore } from "../auth/Permission";
import { FaSnowflake, FaBookOpen, FaBox, FaBoxes, FaBuilding, FaChild, FaClipboardList, FaClock, FaCloud, FaCodeBranch, FaCog, FaFlask, FaHandPointer, FaIndustry, FaLayerGroup, FaLink, FaMapMarkerAlt, FaMicrochip, FaMountain, FaPlusCircle, FaRoute, FaTags, FaTruck, FaUser, FaUserFriends, FaUserShield } from "react-icons/fa";
import { FaCogs } from "react-icons/fa"
import { FaProjectDiagram } from "react-icons/fa";
import { RiDashboard2Fill } from "react-icons/ri";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import SearchInputFields from "./SearchInputFields";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ moduleName }) => {

  const navigate = useNavigate();
  // const [moduleName, setModuleName] = useState(moduleName);
  const [isCollapsed, setIsCollapsed] = useState(false);
  // const hasPermission = usePermissionStore((state) => state.hasPermission);
  const permissions = usePermissionStore((state) => state.permissions);
  // simple permission checker
  const hasPermission = (permissionName) => permissions.includes(permissionName);

  const [searchText, setSearchText] = useState("");

  const [masterList, setMasterList] = useState([
    { key: "plantMaster", label: "Plant Master", icon: <FaIndustry size={20} /> },
    { key: "roleMaster", label: "Role Master", icon: <FaUserShield size={20} /> },
    { key: "departmentMaster", label: "Department Master", icon: <FaBuilding size={20} /> },
    { key: "shiftMaster", label: "Shift Master", icon: <FaClock size={20} /> },
    { key: "employeeMaster", label: "Employee Master", icon: <FaUser size={20} /> },
    { key: "locationMaster", label: "Location Master", icon: <FaMapMarkerAlt size={20} /> },
    { key: "rackMaster", label: "Rack Master", icon: <FaBoxes size={20} /> },
    { key: "processMaster", label: "Process Master", icon: <FaProjectDiagram size={20} /> },
    { key: "compoundMaster", label: "Compound Master", icon: <FaFlask size={20} /> },
    { key: "machineMaster", label: "Machine Master", icon: <FaIndustry size={20} /> },
    { key: "devicesMaster", label: "Devices Master", icon: <FaMicrochip size={20} /> },
    { key: "supplierMaster", label: "Supplier Master", icon: <FaTruck size={20} /> },
    { key: "productionArticleCategoryMaster", label: "Production Article Category Master", icon: <FaLayerGroup size={20} /> },
    { key: "productionArticleMaster", label: "Production Article Master", icon: <FaIndustry size={20} /> },
    { key: "storeMaterialCategoryMaster", label: "Store Material Category Master", icon: <FaTags size={20} /> },
    { key: "storeMaterialMaster", label: "Store Material Master", icon: <FaBox size={20} /> },
    { key: "storeCategoryMappingMaster", label: "Store Category Mapping Master", icon: <FaTags size={20} /> },
    { key: "storeMaterialSupplierMappingMaster", label: "Store Material Supplier Mapping Master", icon: <FaTags size={20} /> },
    //{ key: "productionRejectionMaster", label: "Production Rejection Master", icon: <FaTruck size={20} /> },
    // { key: "productionOperationsMaster", label: "Production Operations Master", icon: <FaCogs size={20} /> },
    //{ key: "productionArticleBomMaster", label: "Production Article Child Part Master", icon: <FaProjectDiagram size={20} /> },
    //{ key: "productionArticleRouteMaster", label: "Production Article Process Master", icon: <FaRoute size={20} /> },
    //{ key: "productionArticleDetailsMaster", label: "Production Article Details Master", icon: <FaClipboardList size={20} /> },
    { key: "packingCustomersDetailsMaster", label: "Packing Customers Details Master", icon: <FaUserFriends size={20} /> },
    { key: "packingCustomerArticleMappingMaster", label: "Packing Customers Article Mapping Master", icon: <FaLink size={20} /> },
    { key: "notificationMaster", label: "Notification Master", icon: <FaCloud size={20} /> },
    { key: "mouldMaster", label: "Mould Master", icon: <FaMountain size={20} /> },
    { key: "mouldChildPartMaster", label: "Mould Child Part Master", icon: <FaChild size={20} /> },

    { key: "mouldPreventiveMaintenanceMaster", label: "Mould Preventive Maintenance Master", icon: <FaCog size={20} /> },
    { key: "productionMouldMaster", label: "Production Mould Master", icon: <FaCog size={20} /> },
    { key: "productionArticleMouldMaster", label: "Production Article Mould Master", icon: <FaCog size={20} /> },

    { key: "productionCompoundMaster", label: "Production Compound Master", icon: <FaCog size={20} /> },
    { key: "productionCompoundChildPartMaster", label: "Production Compound Child Part Master", icon: <FaCog size={20} /> },
    { key: "coldMaster", label: "Cold Runner Master", icon: <FaSnowflake size={20} /> },
    { key: "productionArticleChildPartBomMaster", label: "Production Article Child Part Bom Master", icon: <FaSnowflake size={20} /> },
    { key: "articleParameterMaster", label: "Article Parameter Master", icon: <FaSnowflake size={20} /> },
    // { key: "preventiveMaintenance", label: "Preventive Maintenance", icon: <FaCog size={20} /> }
  ])

  const filteredMasterList = masterList.filter(item =>
    item.label.toLowerCase().includes(searchText.toLowerCase()) ||
    item.key.toLowerCase().includes(searchText.toLowerCase())
  );

  // Auto-collapse if screen < 1000px
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1500) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // run on load
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const setModuleNameAndNavigate = (moduleName) => {
    window.location.href = moduleName;
  };

  return (
    <div
      className="d-flex flex-column text-white"
      style={{
        width: isCollapsed ? "50px" : "260px",
        height: "100vh",
        position: "sticky",
        top: 0,
        backgroundColor: "#0f6b5b"
      }}
    >
      {/* Toggle Button */}
      <button
        className="btn btn-sm btn-outline-light m-2 p-0"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <List size={28} />
      </button>

      {/* Logo */}
      {!isCollapsed && (
        <div>
          <a
            href="/WebApplication/dashboard"
            className="d-flex align-items-center mb-3 text-white text-decoration-none px-3"
          >
            <span className="fs-5 fw-bold">
              <Database size={20} className="me-2" />
              {moduleName}
            </span>
          </a>
          <div className="px-3">
            <SearchInputFields
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      )}

      <hr className="border-light mx-2" />
      <div
        className={isCollapsed ? "flex-grow-1" : "flex-grow-1 sidebar-scroll"}
        style={{ overflowY: isCollapsed ? "hidden" : "auto", overflowX: "hidden" }}
      >
        <ul className="nav nav-pills flex-column mb-auto">
          {filteredMasterList.map(item =>
            hasPermission(item.key) && (
              <li className="nav-item" key={item.key}>
                {isCollapsed ? (
                  <OverlayTrigger
                    placement="right"
                    container={document.body}
                    overlay={<Tooltip id={`tooltip-${item.key}`}>{item.label}</Tooltip>}
                  >
                    <div style={{ display: "inline-block", width: "100%" }}>
                      <NavLink
                        to={item.key}
                        className={({ isActive }) =>
                          `nav-link d-flex justify-content-center align-items-center sidebar-link ${isActive ? "sidebar-active" : "text-white"
                          }`
                        }
                      >
                        {item.icon}
                      </NavLink>
                    </div>
                  </OverlayTrigger>
                ) : (
                  <NavLink
                    to={item.key}
                    className={({ isActive }) =>
                      `nav-link d-flex align-items-center px-3 sidebar-link ${isActive ? "sidebar-active" : "text-white"
                      }`
                    }
                  >
                    <span className="me-2">{item.icon}</span>
                    {item.label}
                    <span className="ms-auto sidebar-arrow">›</span>
                  </NavLink>
                )}
              </li>
            )
          )}

        </ul>
      </div>


      <hr className="border-light mx-2" />

      {/* Logout */}
      <ul className="nav nav-pills flex-column">
        <li className="nav-item">
          <OverlayTrigger
            placement="right"
            // container={document.body}
            overlay={
              <Tooltip id={`tooltip-back`}>
                Back To Dashboard
              </Tooltip>
            }
          >
            <Link
              // to="/WebApplication/moduleDashboard"
              onClick={() => setModuleNameAndNavigate("/WebApplication/moduleDashboard")}
              className="nav-link text-white d-flex align-items-center px-3 sidebar-link"
            >
              <Back size={20} className="me-2" />
              {!isCollapsed && "Go To Dashboard"}
            </Link>
          </OverlayTrigger>
        </li>

        <li className="nav-item">
          <Link
            to="logout"
            className="nav-link text-white d-flex align-items-center px-3 sidebar-link"
          >
            <BoxArrowRight size={20} className="me-2" />
            {!isCollapsed && "Logout"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
