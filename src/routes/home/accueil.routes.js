const express = require("express");
const accueilRouter = express.Router();
const {
  fetchServicesData,
  fetchAnimalsData,
  fetchHabitatData,
  fetchReviewsData,
} = require("../../utils/apiClient");

const decodeData = require("../../utils/decodeData");

accueilRouter.get("/", async (req, res) => {
  try {
    const animals = await fetchAnimalsData();
    const services = await fetchServicesData();
    const habitats = await fetchHabitatData();
    const reviews = await fetchReviewsData();
    const approvedReviews = reviews.filter(review => review.approved === true);

    const decodedAnimal = decodeData(animals);
    const decodedService = decodeData(services);
    const decodedHabitats = decodeData(habitats);
    const decodedApprovedReviews = decodeData(approvedReviews);
    
    const errorMessagesLogin = req.flash('error_msg_login');
    const errorMessagesReview = req.flash('error_msg_review');

    res.render("layouts/accueil", {
      title: "Page d'accueil",
      animals: decodedAnimal,
      services: decodedService,
      habitats: decodedHabitats,
      reviews: decodedApprovedReviews,
      errorMessagesLogin: errorMessagesLogin,
      errorMessagesReview: errorMessagesReview
    });
  } catch (err) {
    console.log(err);
    res.render("layouts/accueil", {
      title: "Page d'accueil",
      errorMessagesLogin: req.flash('error_msg_login'),
      errorMessagesReview: req.flash('error_msg_review'),
      animals: [],
      services: [],
      habitats: [],
      reviews: [],
    });
  }
});

module.exports = accueilRouter;
