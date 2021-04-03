import { useState } from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';

const StyledBadge = withStyles((theme) => ({
	badge: {
		backgroundColor: '#44b700',
		color: '#44b700',
		boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
		'&::after': {
			position: 'absolute',
			top: 0,
			left: 0,
			width: '100%',
			height: '100%',
			borderRadius: '50%',
			animation: '$ripple 1.2s infinite ease-in-out',
			border: '1px solid currentColor',
			content: '""',
		},
	},
	'@keyframes ripple': {
		'0%': {
			transform: 'scale(.8)',
			opacity: 1,
		},
		'100%': {
			transform: 'scale(2.4)',
			opacity: 0,
		},
	},
}))(Badge);

const useStyles = makeStyles((theme) => ({
	root: {
		alignItems: 'center',
		display: 'flex',
		'& > *': {
			margin: theme.spacing(1),
		},
	},
}));

function UserName({ username }) {
	const classes = useStyles();
	const [user] = useState(JSON.parse(localStorage.getItem('user')));

	return (
		<div className={classes.root}>
			{/*  This is where a dot will appear if the user listed is online */}
			{username === user.name ? (
				<StyledBadge
					overlap="circle"
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'right',
					}}
					variant="dot"
				>
					<Avatar alt={user.name} src={user.photo ? user.photo : 'https://i.imgur.com/6VBx3io.png'} />
				</StyledBadge>
			) : (
				<Avatar alt={user.name} src={user.photo ? user.photo : 'https://i.imgur.com/6VBx3io.png'} />
			)}
			<div className={classes.userName}>{user.name}</div>
		</div>
	);
}

export default UserName;
