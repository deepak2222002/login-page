import React, { useState } from "react";
import { Card, Button, Collapse } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

const ProjectCard = ({ project, location, formData, userDetails }) => {
  const [open, setOpen] = useState(false);
  const { setAlert } = useOutletContext();
  const navigate = useNavigate();

  return (
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        {/* Project Title */}
        <Card.Title>{project.projectName}</Card.Title>

        {/* Extra project details */}
        <Card.Text>
          <strong>P.M:</strong><span> {project.projectManager} </span> <br />
          <strong>Start Date:</strong> <span> {project.startDate} </span><br />
          <strong>End Data:</strong> <span> {project.endDate}</span>
        </Card.Text>

        {/* Progress Bar
        <div className="mb-2">
          <ProgressBar now={project.progress} label={`${project.progress}%`} />
        </div> */}

        {/* Show Tasks button */}
        <Button
          variant="primary"
          size="sm"
          onClick={() =>
            navigate("/WebApplication/dashboard/tasks/showDetailTask", {
              state: { project, from: location, previousData: formData, user: userDetails},
            })
          }
        >
          Show Tasks
        </Button>
      </Card.Body>
    </Card>
  );

};

export default ProjectCard;
