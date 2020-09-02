import React from 'react';
import Palette from 'Styled/palette';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// style:
// normal (單純警告視窗，僅有確認按鈕(handleClose))
// YESNO (擁有取消(handleCancle)和確認(handleClose)的警告視窗)
const AlertDialog = ({ open = false, style = 'normal', handleClose, handleCancle, title, context, classes }) => (
  <Dialog open={open} onClose={handleClose} className={classes.root} disableBackdropClick>
    <DialogContent>
      <div className="title">
        <p>{title}</p>
      </div>
      <div className="context">
        <p>{context}</p>
      </div>
    </DialogContent>
    <DialogActions>
      {style === 'YESNO' ? <Button onClick={handleCancle}>取消</Button> : null}
      <Button onClick={handleClose}>確認</Button>
    </DialogActions>
  </Dialog>
);

const styles = {
  root: {
    '& .MuiPaper-rounded': { borderRadius: '10px', backgroundColor: Palette.THIRD[90] },
    '& .MuiDialogActions-root': { padding: '14px', borderTop: '1px solid #555555' },
    '& .MuiButton-label': { color: '#ff80c8' },
    '& .title': { fontSize: '18px', fontWeight: 'bold', color: '#ffffff' },
    '& .context': { fontSize: '14px', fontWeight: 'none', width: '280px', color: '#ffffff' },
  },
};

export default withStyles(styles)(AlertDialog);
