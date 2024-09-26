import { useState } from "react";
import Pagination from "../Pagination";

function StartUpList() {
	const [pageNum, setPageNum] = useState(1);
	const [pageNumMax, setPageNumMax] = useState(5);

	return (<>
		<Pagination pageNum={pageNum} setPageNum={setPageNum} pageNumMax={pageNumMax}/>
	</>);
}

export default StartUpList;
