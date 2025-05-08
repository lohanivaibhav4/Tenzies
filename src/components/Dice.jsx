export default function Dice(props){
    const styles = {
        backgroundColor: props.isHeld ? '#1DCA8E' : 'White'
    }
    return(
        <button onClick={props.hold} style={styles} className="dice">{props.value}</button>
    )
}