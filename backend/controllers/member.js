const Member = require("../modals/member");
const Membership = require("../modals/membership");

exports.getAllMembers = async (req, res) => {
  try {
    const { skip, limit } = req.query;
    const members = await Member.find({ gym: req.gym._id });
    const totalMembers = members.length;

    const limitedMembers = await Member.find({ gym: req.gym._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      message: members.length
        ? "Fetched Members Successfully "
        : "No any Member Registered yet",
      members: limitedMembers,
      totalMembers: totalMembers,
    });
  } catch (error) {
    console.log("error in get all member", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

function addMonthsToDate(months, joiningDate) {
  let today = joiningDate;
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth(); //months are 0 indexed
  const currentDay = today.getDate();

  //calculate the new month and year
  const futureMonth = currentMonth + months;
  const futureYear = currentYear + Math.floor(futureMonth / 12);

  //calculate the correct future month(modules for months)
  const adjustedMonth = futureMonth % 12;

  //set the date to the first of the future month
  const futureDate = new Date(futureYear, adjustedMonth, 1);

  //get the last day of the future month
  const lastDayOfFutureMonth = new Date(
    futureYear,
    adjustedMonth + 1,
    0,
  ).getDate();

  //adjust the day if current day exceeds the number of days in the new month
  const adjustedDay = Math.min(currentDay, lastDayOfFutureMonth);

  //set the final adjusted day
  futureDate.setDate(adjustedDay);

  return futureDate;
}

exports.registerMember = async (req, res) => {
  try {
    const { name, mobileNo, address, membership, profilePic, joiningDate } =
      req.body;
    const member = await Member.findOne({ gym: req.gym._id, mobileNo });

    if (member) {
      return res
        .status(409)
        .json({ error: "Already registered with this mobile no" });
    }

    const memberShip = await Membership.findOne({
      _id: membership,
      gym: req.gym._id,
    });

    const memberShipMonth = memberShip.months;

    if (memberShip) {
      let jngDate = new Date(joiningDate);
      const nextBillDate = addMonthsToDate(memberShipMonth, jngDate);

      let newMember = new Member({
        name,
        mobileNo,
        address,
        membership,
        gym: req.gym._id,
        profilePic,
        nextBillDate,
      });

      await newMember.save();
      res
        .status(200)
        .json({ message: "Member Registered Successfully", newMember });
    } else {
      return res.status(400).json({ error: "No such Membership are there" });
    }
  } catch (error) {
    console.log("error in get all member", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.searchMember = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    const member = await Member.find({
      gym: req.gym._id,
      $or: [
        { name: { $regex: "^" + searchTerm, $options: "i" } },
        { mobileNo: { $regex: "^" + searchTerm, $options: "i" } },
      ],
    });

    res.status(200).json({
      message: member.length
        ? "Fetched Members Successfully "
        : "No Such Member Registered yet ",
      members: member,
      totalMembers: member.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Search error" });
  }
};

exports.monthlyMember = async (req, res) => {
  try {
    const now = new Date();

    //get the first day of the current month(e.g. 2024-12-01)
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    //get the last day of the current month
    const endOfMonth = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
      23,
      59,
      59,
      999,
    );
    const member = await Member.find({
      gym: req.gym._id,
      createdAt: {
        $gt: startOfMonth, //greater that or qual to the first day of the month
        $lte: endOfMonth, //less then or equal to the last day of the month
      },
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: member.length
        ? "Fetched member Successfully"
        : "No Such Member Expiring within month ",
      members: member,
      totalMember: member.length,
    });

    // console.log(startOfMonth, lastOfMonth);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Search error" });
  }
};

exports.expiringwithin3Days = async (req, res) => {
  try {
    const today = new Date();
    const nextThreeDays = new Date();
    nextThreeDays.setDate(today.getDate() + 3);

    const member = await Member.find({
      gym: req.gym._id,
      nextBillDate: {
        $gt: today,
        $lte: nextThreeDays,
      },
    });

    res.status(200).json({
      message: member.length
        ? "fetched Members Successfully"
        : "No Such Member Expiring within 3 days ",
      members: member,
      totalMember: member.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Search error" });
  }
};

exports.expiringWithin4To7days = async (req, res) => {
  try {
    const today = new Date();
    const next4Days = new Date();
    next4Days.setDate(today.getDate() + 4);

    const next7Day = new Date();
    next7Day.setDate(today.getDate() + 7);

    const member = await Member.find({
      gym: req.gym._id,
      nextBillDate: {
        $gt: next4Days,
        $lte: next7Day,
      },
    });

    res.status(200).json({
      message: member.length
        ? "fetched Members Successfully"
        : "No Such Member Expiring within 4-7 days ",
      members: member,
      totalMember: member.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Search error" });
  }
};

exports.expired = async (req, res) => {
  try {
    const today = new Date();
    const member = await Member.find({
      gym: req.gym._id,
      status: "Active",
      nextBillDate: {
        $lt: today,
      },
    });
    res.status(200).json({
      message: member.length
        ? "Fetched Member Successfully "
        : " No Such Member is Expired",
      member: member,
      totalMembers: member.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Search error" });
  }
};

exports.inactive = async (req, res) => {
  try {
    const member = await Member.find({
      gym: req.gym._id,
      status: "Pending",
    });

    res.status(200).json({
      message: member.length
        ? "Fetched Members Successfully "
        : "No Such Member has been Pending",
      member: member,
      totalMembers: member.length,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Search error" });
  }
};

exports.getMemberDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Member.findOne({ _id: id, gym: req.gym._id });
    if (!member) {
      return res.status(400).json({
        error: "No Such Member",
      });
    }

    res.status(200).json({
      message: "Member Data Fetched",
      member: member,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Search error" });
  }
};

exports.changeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const member = await Member.findOne({ _id: id, gym: req.gym._id });
    if (!member) {
      return res.status(400).json({
        error: "No Such Member",
      });
    }

    member.status = status;
    await member.save();

    res.status(200).json({
      message: "Status Changed Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Search error" });
  }
};

exports.updateMemberPlan = async (req, res) => {
  try {
    const { membership } = req.body;
    const { id } = req.params;

    const memberShip = await Membership.findOne({
      gym: req.gym._id,
      _id: membership,
    });

    if (memberShip) {
      let getMonth = memberShip.months;
      let today = new Date();
      const nextBillDate = addMonthsToDate(getMonth, today);
      const member = await Member.findOne({ gym: req.gym._id, _id: id });
      if (!member) {
        return res.status(409).json({ error: "No Such Member are there" });
      }
      member.nextBillDate = nextBillDate;
      member.lastBillDate = today;

      await member.save()

      res.status(200).json({message:"Member Renewed Successfully", member})

    } else {
      return res.status(409).json({
        error: "No Such Membership are there",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Search error" });
  }
};
