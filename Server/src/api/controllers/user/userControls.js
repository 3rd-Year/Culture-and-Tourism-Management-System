const User = require("../../models/user");

const findOneUser = async (req, res) => {
	try {
		const user = await User.findOne({ _id: req.params.id });

		if (!user) {
			return res.status(404).json({ message: "User Not Found!" });
		} else {
			return res
				.status(200)
				.json({ data: user, message: "User Found !" });
		}
	} catch (error) {
		return res.status(400).json({ message: "Server Error !" });
	}
};

const retrieveAllUsers = async (req, res) => {
	try {
		const users = await User.find();
		return res.status(200).json({
			data: users,
			message: "Fetching users successfull !",
		});
	} catch (error) {
		return res.status(400).json({ message: "Server Error !" });
	}
};

const updateUser = async (req, res) => {
	const paramsID = req.params.id;
	try {
		const user = await User.findById(paramsID);
		if (!user) {
			return res.status(404).json({ message: "User Not Found!" });
		} else {
			const {
				firstname,
				lastname,
				email,
				mobile,
				nationality,
				nic_passport,
				address_country,
				gender,
				isForiegner,
			} = req.body;

			const updatedUser = await User.findByIdAndUpdate(paramsID, {
				firstname,
				lastname,
				email,
				mobile,
				nationality,
				nic_passport,
				address_country,
				gender,
				isForiegner,
			});

			return res.status(200).json({
				firstname: req.body.firstname,
				lastname: req.body.lastname,
				data: updatedUser,
				message: "User Updated Successfully !",
			});
		}
	} catch (error) {
		return res.status(400).json({ message: "Server Error !" });
	}
};

const deleteUser = async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			console.log("User Not Found!");
			return res.status(404).json({ message: "User Not Found!" });
		} else {
			const deletedUser = await User.findByIdAndDelete(
				req.params.id,
			);

			return res.status(200).json({
				data: deletedUser,
				message: "User Deleted Successfully !",
			});
		}
	} catch (error) {
		return res.status(400).json({ message: "Server Error !" });
	}
};

const filterUserEmail = async (req, res) => {
	try {
		let { searchFilter } = req.body;

		let UserViewModel = [];

		if (searchFilter) {
			UserViewModel = await User.find({
				email: { $regex: searchFilter, $options: "i" },
			});
		} else {
			UserViewModel = await User.find();
		}

		res.status(200).json({ data: UserViewModel });
	} catch (error) {
		return res.status(400).json({ message: "Server Error !" });
	}
};

const filterUserFirstName = async (req, res) => {
	try {
		let { searchFilter } = req.body;

		let UserViewModel = [];

		if (searchFilter) {
			UserViewModel = await User.find({
				firstname: { $regex: searchFilter, $options: "i" },
			});
		} else {
			UserViewModel = await User.find();
		}

		res.status(200).json({ data: UserViewModel });
	} catch (error) {
		return res.status(400).json({ message: "Server Error !" });
	}
};

const filterUserLastName = async (req, res) => {
	try {
		let { searchFilter } = req.body;

		let UserViewModel = [];

		if (searchFilter) {
			UserViewModel = await User.find({
				lastname: { $regex: searchFilter, $options: "i" },
			});
		} else {
			UserViewModel = await User.find();
		}

		res.status(200).json({ data: UserViewModel });
	} catch (error) {
		return res.status(400).json({ message: "Server Error !" });
	}
};

const filterUserNIC = async (req, res) => {
	try {
		let { searchFilter } = req.body;

		let UserViewModel = [];

		if (searchFilter) {
			UserViewModel = await User.find({
				nic_passport: { $regex: searchFilter, $options: "i" },
			});
		} else {
			UserViewModel = await User.find();
		}

		res.status(200).json({ data: UserViewModel });
	} catch (error) {
		return res.status(400).json({ message: "Server Error !" });
	}
};

module.exports = {
	findOneUser,
	retrieveAllUsers,
	updateUser,
	deleteUser,
	filterUserEmail,
	filterUserFirstName,
	filterUserLastName,
	filterUserNIC,
};
