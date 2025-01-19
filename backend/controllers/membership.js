const Membership = require("../modals/membership");

exports.addMembership = async (req, res) => {
  try {
    const { months, price } = req.body;

    const membership = await Membership.findOne({ gym: req.gym._id, months });
    if (membership) {
      membership.price = price;
      await membership.save();
      res.status(200).json({
        message: "Updated successfully",
      }); 
    } else {
      const newMembership = await Membership({
        months,
        price,
        gym: req.gym._id,
      });
      await newMembership.save();
    }
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.getMembership = async (req, res) => {
  try {
    const loggedInId = req.gym._id;
    const membership = await Membership.find({ gym: loggedInId });

    res
      .status(200)
      .json({
        message: "Membership fetched Successfully",
        membership: membership,
      });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};
