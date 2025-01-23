export const getLinks = (links: LinkElement[]) => {
	return links.map((el, index) => {
		return (
			<li key={index} className="nav-item">
				<a
					className="nav-link active"
					aria-current="page"
					href={`/${el.route}`}
				>
					{el.text}
				</a>
			</li>
		);
	});
};
