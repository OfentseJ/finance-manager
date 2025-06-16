const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Expense = require("../models/Expense");

// Create a new expense
router.post("/", auth, async (req, res) => {
  const { amount, category, description, date } = req.body;
  try {
    const newExpense = new Expense({
      userId: req.user.id,
      amount,
      category,
      description,
      date,
    });

    const expense = await newExpense.save();
    res.status(201).json(expense);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Get all expenses for the authenticated user
router.get("/", auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({
      date: -1,
    });
    res.json(expenses);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Update an expense
router.put("/:id", auth, async (req, res) => {
  const { amount, category, description, date } = req.body;

  const fieldsToUpdate = { amount, category, description, date };
  try {
    let expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    if (expense.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { $set: fieldsToUpdate },
      { new: true }
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server error");
  }
});

//Delete an expense

router.delete("/:id", auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    if (expense.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await expense.deleteOne();
    res.json({ message: "Expense deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
