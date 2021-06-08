const style = (theme) => ({
  signInDiv: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundImage: "radial-gradient(#dbd9d9, #8f8f8f)",
    '& a':{
      textDecoration: 'none',
    },
    "& button": {
      color: "#fff",
      background: "#0076b2",
      fontSize: 20,
      fontWeight: 600,
      padding: 10,
      textTransform: "none",
      "& img": {
        width: 60,
      },
    },
    "& button:hover": {
      opacity: "0.8",
      backgroundColor: "#0076b2",
    },
  },
  body:{
    positive:'relative',
  },
  headerBar: {
    position: "fixed",
    backgroundColor: "#0076b2",
  },
  headerLeft: {
    display: "flex",
    position: "absolute",
    left: 16,
    top: 12,
    "& h4": {
      margin: "14px 8px",
    },
  },
  headerRight: {
    display: "flex",
    position: "absolute",
    right: 0,
    left: "inherit",
    "& button": {
      color: "#0076b2",
      fontWeight: 600,
      borderRadius:'50%',
      width: 40,
      height:40
    },
    "& button:hover": {
      background: '#fff',
      opacity:'0.8'
    },
    '& .add':{
      right: 26
    },
    '& .dot':{
      right: 20
    }
  },
  modalWidth: {
    "& .MuiDialog-paperWidthSm": {
      minWidth: 400,
    },
  },
  bodyDiv: {
    position: "relative",
    top: 50
  },
  cancelCrossIcon: {
    position: "absolute",
    right: 4,
    cursor: "pointer",
    color: "#fff",
    top: 4,
    width: 32,
    height: 32,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    background: "#0076b2",
    border: "1px solid #0076b2",
    justifyContent: "center",
    zIndex: 9,
    "& svg": {
      width: 16,
      height: 16,
    },
    "&:hover": {
      backgroundColor: "#0076b2",
      opacity: "0.8",
    },
  },
  createTask: {
    right:10,
    width: 40,
    height: 40,
    "& svg": {
      width: 24,
      height: 24,
    },
  },
  dragItem: {
    "& li": {
      listStyleType: "none",
      background: "#cbcbcb6b",
      maxWidth: 215,
      height: "auto",
      padding: 10,
      margin: 10,
    },
  },
  actionButton:{
    position: 'absolute',
    bottom: 20,
    right: 0, 
    '& button':{
       color: "#fff",
       background: "#0076b2",
       textTransform: "none",
       fontWeight: 600,
       width: 100,
       margin: 5,
    },
    '& button:hover':{
      opacity: '0.8',
      color: "#fff",
      background: "#0076b2",
    },
    '& .buttonCancel':{
        color: "#fff",
        background: "#999999",
    },
    '& .buttonCancel:hover':{
        color: "#fff",
        background: "#999999",
    }
  },
  dialogContent:{
    height:175,
    marginBottom:30,
    '& .MuiTextField-root':{
      width: '100%',
      margin:'15px 0px',
    }
  },
  todoList:{
    padding:'20px 0px'
  }
});

export default style;
