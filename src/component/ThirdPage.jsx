import React, { useState } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  Collapse,
  Checkbox,
  IconButton,
} from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const DepartmentList = () => {
  // Hardcoded JSON data for departments and sub-departments
  const departmentsData = [
    {
      name: 'customer_service',
      subDepartments: ['support', 'customer_success'],
    },
    {
      name: 'design',
      subDepartments: ['graphic_design', 'product_design', 'web_design'],
    },

  ];

  // State to track the selection of departments and sub-departments
  const [selected, setSelected] = useState({});

  // State to track the expansion/collapse of sub-departments
  const [expanded, setExpanded] = useState({});

  // Function to handle department selection
  const handleDepartmentSelect = (departmentIndex) => () => {
    const departmentName = departmentsData[departmentIndex].name;
    setSelected((prevSelected) => {
      const isSelected = !prevSelected[departmentName];
      const updatedSelected = { ...prevSelected, [departmentName]: isSelected };

      // Select or deselect all sub-departments when selecting/deselecting the department
      if (isSelected) {
        departmentsData[departmentIndex].subDepartments.forEach((subDepartment) => {
          updatedSelected[subDepartment] = true;
        });
      } else {
        departmentsData[departmentIndex].subDepartments.forEach((subDepartment) => {
          updatedSelected[subDepartment] = false;
        });
      }

      return updatedSelected;
    });
  };

  // Function to handle sub-department selection
  const handleSubDepartmentSelect = (departmentIndex, subDepartmentIndex) => () => {
    const departmentName = departmentsData[departmentIndex].name;
    const subDepartmentName = departmentsData[departmentIndex].subDepartments[subDepartmentIndex];
    setSelected((prevSelected) => {
      const isSelected = !prevSelected[subDepartmentName];
      const updatedSelected = { ...prevSelected, [subDepartmentName]: isSelected };

      // Check if all sub-departments are selected to select the parent department as well
      const areAllSubDepartmentsSelected = departmentsData[departmentIndex].subDepartments.every(
        (subDepartment) => updatedSelected[subDepartment]
      );
      updatedSelected[departmentName] = areAllSubDepartmentsSelected;

      return updatedSelected;
    });
  };

  // Function to handle sub-department expansion
  const handleSubDepartmentExpand = (departmentIndex) => () => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [departmentIndex]: true,
    }));
  };

  // Function to handle sub-department collapse
  const handleSubDepartmentCollapse = (departmentIndex) => () => {
    setExpanded((prevExpanded) => ({
      ...prevExpanded,
      [departmentIndex]: false,
    }));
  };

  return (
    <List>
      {departmentsData.map((department, departmentIndex) => (
        <React.Fragment key={department.name}>
          <ListItem>
            <Checkbox checked={selected[department.name]} onChange={handleDepartmentSelect(departmentIndex)} />
            <ListItemText primary={department.name} />
            {expanded[departmentIndex] ? (
              <IconButton aria-label="collapse" onClick={handleSubDepartmentCollapse(departmentIndex)}>
                <ExpandLessIcon />
              </IconButton>
            ) : (
              <IconButton aria-label="expand" onClick={handleSubDepartmentExpand(departmentIndex)}>
                <ExpandMoreIcon />
              </IconButton>
            )}
          </ListItem>
          <Collapse in={expanded[departmentIndex]} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {department.subDepartments.map((subDepartment, subDepartmentIndex) => (
                <ListItem
                  key={subDepartmentIndex}
                  onClick={handleSubDepartmentSelect(departmentIndex, subDepartmentIndex)}
                  sx={{ pl: 4 }}
                >
                  <Checkbox checked={selected[subDepartment]} />
                  <ListItemText primary={subDepartment} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        </React.Fragment>
      ))}
    </List>
  );
};

export default DepartmentList;
