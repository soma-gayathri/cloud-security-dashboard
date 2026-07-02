const express = require("express");

const router = express.Router();

let alerts = [
  {
    id: 1,
    title: "Suspicious login attempt",
    severity: "High",
    status: "Open",
    source: "Identity Service"
  },
  {
    id: 2,
    title: "Unusual API traffic detected",
    severity: "Medium",
    status: "Investigating",
    source: "API Gateway"
  },
  {
    id: 3,
    title: "Cloud storage access policy updated",
    severity: "Low",
    status: "Resolved",
    source: "Cloud Storage"
  }
];

router.get("/", (req, res) => {
  res.json(alerts);
});

router.post("/", (req, res) => {
  const newAlert = {
    id: alerts.length + 1,
    title: req.body.title,
    severity: req.body.severity,
    status: req.body.status,
    source: req.body.source
  };

  alerts.push(newAlert);

  res.status(201).json(newAlert);
});

router.patch("/:id/status", (req, res) => {
  const alertId = Number(req.params.id);
  const { status } = req.body;

  const alert = alerts.find((item) => item.id === alertId);

  if (!alert) {
    return res.status(404).json({ message: "Alert not found" });
  }

  alert.status = status;

  res.json(alert);
});

module.exports = router;
