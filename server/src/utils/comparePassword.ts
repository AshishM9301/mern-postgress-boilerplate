import bcrypt from "bcryptjs";

const compare = async (tobeCompared: string, compareString: string) => {
  try {
    await bcrypt.compare(compareString, tobeCompared);
  } catch (err) {
    return false;
  }
  return true;
};

export default compare;
