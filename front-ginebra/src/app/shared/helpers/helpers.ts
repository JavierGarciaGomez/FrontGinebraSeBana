import Swal from 'sweetalert2';
import { IPet } from '../interfaces/interfaces';

export const fireSwalConfirmation = async () => {
  const isConfirmed = await Swal.fire({
    title: '¿Estás seguro?',
    text: 'Este cambio es irrevertible',
    icon: 'warning',
    showCancelButton: true,
  });
  return isConfirmed;
};

export const addImgAndAuthorizationsToPet = (pet: IPet, userId: string) => {
  if (!pet.imgUrl || pet.imgUrl === '')
    pet.imgUrl = 'assets/images/unknownPet.jpg';

  const linkedUser = pet.linkedUsers.find(
    (linkedUser) => linkedUser.linkedUser._id === userId
  );
  pet.viewAuthorization = linkedUser?.viewAuthorization || false;
  pet.editAuthorization = linkedUser?.editAuthorization || false;
  pet.creator = linkedUser?.creator || false;

  return pet;
};

export const convertStringToArray = (text: string) => {
  if (text.includes(',')) {
    return (text as unknown as string).split(',');
  } else return [text];
};
