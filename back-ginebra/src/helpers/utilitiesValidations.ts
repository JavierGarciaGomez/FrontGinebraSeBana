import { IPet } from "../interfaces/interfaces";
export const isAuthorizedToEditPet = (
  pet: IPet,
  userRequestUid: string
): boolean => {
  const linkedUser = pet.linkedUsers.find((linkedUser) => {
    console.log({ linkedId: linkedUser.linkedUser.toString(), userRequestUid });
    if (
      linkedUser.linkedUser.toString() === userRequestUid &&
      linkedUser.editAuthorization
    ) {
      return linkedUser;
    }
  });
  if (linkedUser) return true;
  return false;
};
