import {
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	Typography,
	Button,
} from "@material-tailwind/react";

const CardBox = (imageSource,title,description) => {
	return (
		<Card className="mt-6 w-96">
			<CardHeader color="blue-gray" className="relative h-56">
				<img
					src={imageSource}
					alt={"Card"}/>
			</CardHeader>
			<CardBody>
				<Typography variant="h5" color="blue-gray" className="mb-2">
					{title}
				</Typography>
				<Typography>
					{description}
				</Typography>
			</CardBody>
			<CardFooter className="pt-0">
				{/*<Button>Read More</Button>*/}
			</CardFooter>
		</Card>
	);
}

export default CardBox