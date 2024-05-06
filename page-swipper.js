const touchHandler = {
	x: {
		start: 0,
		end: 0
	},
	y: {
		start: 0,
		end: 0
	}
}

const path: {
	left?: string,
	right?: string
} = {};

export function initTouchHandler(_path: { left?: string, right?: string })
{
	path.left = _path.left;
	path.right = _path.right;
	document.addEventListener('touchstart', startTouchHandler);
	document.addEventListener('touchend', stopTouchHandler);
}

export function resetTouchHandler()
{
	touchHandler.x.start = 0;
	touchHandler.x.end = 0;
	touchHandler.y.start = 0;
	touchHandler.y.end = 0;

	delete path.left;
	delete path.right;

	document.removeEventListener('touchstart', startTouchHandler);
	document.removeEventListener('touchend', stopTouchHandler);
}

export function startTouchHandler(event: TouchEvent)
{
	touchHandler.x.start = event.changedTouches[0].clientX;
	touchHandler.y.start = event.changedTouches[0].clientY;
}

export function stopTouchHandler(event: TouchEvent)
{
	touchHandler.x.end = event.changedTouches[0].clientX;
	touchHandler.y.end = event.changedTouches[0].clientY;

	const deltaX = touchHandler.x.end - touchHandler.x.start;
	const deltaY = touchHandler.y.end - touchHandler.y.start;

	if (Math.abs(deltaX) > Math.abs(deltaY))
	{
		if (deltaX < 0 && path.left)
		{
			useRouter().push(path.left); // Redirection VueJS
			resetTouchHandler();
		}
		else if (deltaX > 0 && path.right)
		{
			useRouter().push(path.right); // Redirection VueJS
			resetTouchHandler();
		}
	}
}
