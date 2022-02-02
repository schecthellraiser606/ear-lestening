import { AlertDialog ,AlertDialogBody,AlertDialogContent,AlertDialogFooter,AlertDialogHeader,AlertDialogOverlay, Button } from "@chakra-ui/react";
import {memo, RefObject, VFC} from "react";

type Props ={
 isOpen: boolean;
 onClose: ()=>void;
 cancelRef: RefObject<HTMLButtonElement> | undefined ;
 deleteHook: ()=>void;
}

export const AlertDialogComp: VFC<Props> = memo( (props)=> {
  const {isOpen, cancelRef, onClose, deleteHook} = props
  return(
    <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Tab -Tab譜を削除します-
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
              本当にいいのですか？ 後から変更はできませんよ？
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={deleteHook} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
  );
});