import React, { useEffect, useState, useContext } from "react";
import { TrainingContext } from "../pages/TrainingContext";
import { Card, Button, Collapse } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import api from "../api/axiosInstance";
import { ProgressBar, Table, Form, Row, Col, Badge } from "react-bootstrap";

const TrainingDetailCard = ({ trainingModel, location, formData, userDetails, loadTrainingModelData }) => {
  const [open, setOpen] = useState(false);
  const { setAlert } = useOutletContext();
  const navigate = useNavigate();
  const context = useContext(TrainingContext);
  // 🔒 SAFETY CHECK (VERY IMPORTANT)
  if (!context) {
    throw new Error(
      "TrainingModelStep1 must be used inside TrainingContext.Provider"
    );
  }
  const { trainingDetails, setTrainingDetails } = context;

  const goToCreateTrainingModel = (trainingModel) => {
    setTrainingDetails(trainingModel);
    navigate("/WebApplication/dashboard/createTrainingModel")
  };

  // Handle form change
  const deleteModel = async (trainingModel) => {
    try {

      const formData = trainingModel;

      const response = await api.post(
        "/WebApplication/ExamTraining/dateTrainingModel",
        formData
      );
      console.log("Data Load Sucessfully:", response);
      alert(response.data);
      loadTrainingModelData();
    } catch (error) {
      console.log(error);
    }
  };


  return (
    // <Card className="mb-3 shadow-sm">
    //   <Card.Body>
    //     {/* trainingModel Title */}
    //     <Card.Title>{trainingModel.trainingName}</Card.Title>

    //     {/* Extra trainingModel details */}
    //     <Card.Text>
    //       <strong>Exam Language:</strong><span> {trainingModel.examLanguageType} </span> <br />
    //       <strong>Training Language:</strong> <span> {trainingModel.trainingLanguageType} </span><br />
    //       <strong>Status:</strong> <span> {trainingModel.examCompleteStatus}</span>
    //     </Card.Text>

    //     {/* Progress Bar
    //     <div className="mb-2">
    //       <ProgressBar now={trainingModel.progress} label={`${trainingModel.progress}%`} />
    //     </div> */}

    //     {/* Show Tasks button */}
    //     <div className="d-flex gap-2 mb-2">
    //       <Button
    //         variant="primary"
    //         size="sm"
    //         onClick={(e) => goToCreateTrainingModel(trainingModel)}>
    //         Edit Training Model
    //       </Button>

    //       <Button
    //         variant="danger"
    //         size="sm"
    //         onClick={(e) => deleteModel(trainingModel)}>
    //         Delete
    //       </Button>
    //     </div>
    //   </Card.Body>
    // </Card>

    <Card className="mb-4 shadow-sm border-0 training-card">
      {/* Header */}
      <Card.Header className="d-flex justify-content-between align-items-center bg-light">
        <h6 className="mb-0 fw-bold text-primary">
          {trainingModel.trainingName}
        </h6>

        <Badge
          bg={trainingModel.examCompleteStatus === "0" ? "warning" : "success"}
          pill
        >{trainingModel.examCompleteStatus === "0" ? "Pending" : "Completed"}
        </Badge>
      </Card.Header>

      <Card.Body className="p-2">
        {/* Training Details */}
        <Row className="mb-1">
          <Col xs={6}>
            <small className="text-muted">Exam Lang :</small>
            <div className="fw-semibold">
              {trainingModel.examLanguageType}
            </div>
          </Col>

          <Col xs={6}>
            <small className="text-muted">Training Lang :</small>
            <div className="fw-semibold">
              {trainingModel.trainingLanguageType}
            </div>
          </Col>
        </Row>

        <hr className="my-2" />

        {/* Extra Information */}
        <Row className="mb-1">
          <Col xs={6}>
            <small className="text-muted">Department</small>
            <div className="fw-semibold">
              {trainingModel?.department?.departmentName}
            </div>
          </Col>

          <Col xs={6}>
            <small className="text-muted">Date & Time</small>
            <div className="fw-semibold">
              {trainingModel.examName}
            </div>
          </Col>
        </Row>

        {/* Optional Progress */}
        {/* 
    <div className="mt-3">
      <small className="text-muted">Progress</small>
      <ProgressBar
        now={trainingModel.progress}
        label={`${trainingModel.progress}%`}
        variant="success"
        striped
        animated
      />
    </div>
    */}
      </Card.Body>

      {/* Footer Actions */}
      <Card.Footer className="bg-white d-flex justify-content-end gap-2">
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => goToCreateTrainingModel(trainingModel)}
        >
          ✏️ Edit
        </Button>

        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => deleteModel(trainingModel)}
        >
          🗑️ Delete
        </Button>
      </Card.Footer>
    </Card>

  );

};

export default TrainingDetailCard;
