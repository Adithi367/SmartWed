import GeneratedQuotation from "../models/generatedQuotationSchema.js";
import Vendor from "../models/vendorSchema.js";
import Plan from "../models/budgetPlanner.js";
import { serviceItemsMap } from "../utils/serviceItems.js";

export const generateQuotation = async (req, res) => {
  try {
    const {planId,vendorId,allocatedBudget}=req.body
    const customerId = req.user.id;

    const plan = await Plan.findById(planId);
    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Plan not found",
      });
    }

    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({
        success: false,
        message: "Vendor not found",
      });
    }
    if(!allocatedBudget){
      return res.status(400).json({
        success:false,
        message:"Allocated Budget is required"
      })
    }
    const existing = await GeneratedQuotation.findOne({
      planId,
      vendorId,
      customerId,
    });

    if (existing) {
      return res.status(200).json({
        success: true,
        message: "Quotation already exists",
        data: existing,
      });
    }

    const budget = plan.amount;

    let vendorPrice = vendor.price;

    let discount = 0;
    let extraCharges = 0;

    if(vendorPrice<=allocatedBudget){
      discount = vendorPrice * 0.05;
    } else {
      extraCharges = vendorPrice * 0.1;
    }

    let finalPrice = vendorPrice - discount + extraCharges;

    let score =
      vendor.rating * 3 +
      (vendorPrice <= allocatedBudget ? 5 : -2) -
      vendorPrice / allocatedBudget;

    const quotation = await GeneratedQuotation.create({
      planId,
      customerId,
      service: vendor.service,
      vendorId,
      allocatedBudget,
      vendorPrice,
      discount,
      extraCharges,
      finalPrice,
      itemsIncluded: serviceItemsMap[vendor.service] || [],
      recommendationScore: score,
    });

    return res.status(201).json({
      success: true,
      message: "Quotation generated successfully",
      data: quotation,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const getMyGeneratedQuotations = async (req, res) => {
  try {
    const customerId = req.user.id;

    const quotations = await GeneratedQuotation.find({ customerId })
      .populate("vendorId")
      .populate("planId")
      .sort({ recommendationScore: -1 });

    

    return res.status(200).json({
      success: true,
      data: quotations,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
export const getAllGeneratedQuotations = async (req, res) => {
  try {
    const quotations = await GeneratedQuotation.find()
      .populate("vendorId")
      .populate("customerId")
      .populate("planId")
      .sort({ recommendationScore: -1 });

    return res.status(200).json({
      success: true,
      data: quotations,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};