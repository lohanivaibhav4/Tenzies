export default function Score(props){
    const styles = {
       borderBottom : props.currScore > props.maxScore ? '3px solid #d62828' : '3px solid #1DCA8E'
    }
    return(
        <div className="score-card">
            <span style={styles} className="current-score" name="current-score">Now : {props.currScore}</span>
            <button onClick={()=>localStorage.clear()} className="reset">Reset Best</button>
            <span className="best-score">Best : {props.maxScore}</span>
            
        </div>
    )
}