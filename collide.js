function check_collide_line (line_to_check) {
    let cum = 0;
    const normal = get_normal_vector(line_to_check);
    const offset = normal[0] * line_to_check.v1[0] + normal[1] * line_to_check.v1[1];
    for (let v of playerObj.vertexPoints) {
        push();
        fill(255,0,0);
        circle(convertPoint(v)[0],convertPoint(v)[1],5);
        pop();
        cum += Math.sign(normal[0] * v[0] + normal[1] * v[1] - offset)
    }
    console.log(normal,offset,cum);
    return Math.abs(cum) != 3;
}

function get_normal_vector (a_line) {
    const scale_vector = [
        a_line.v1[1] - a_line.v2[1],
        a_line.v2[0] - a_line.v1[0]
    ];
    const mag = Math.sqrt(scale_vector[0]**2 + scale_vector[1]**2);
    return scale_vector.map(x => x/mag);
}