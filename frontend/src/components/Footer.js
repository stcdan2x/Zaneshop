/* eslint-disable no-unused-vars */
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
	return (
		<footer>
			<Container>
				<Row>
					<Col className="text-center py-3">
						<Link to="/agent">Agent Dashboard</Link>
					</Col>
					<Col className="text-center py-3">
						{" "}
						<h4>Copyright &copy; SkyZen</h4>{" "}
					</Col>
					<Col className="text-center py-3">
						<Link to="/">Client Home</Link>
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
