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
    //console.log(normal,offset,cum);
    if (Math.abs(cum) == 3) return false;
    const w = [
        (line_to_check.v2[0] - line_to_check.v1[0]),
        (line_to_check.v2[1] - line_to_check.v1[1]) 
    ];
    const vsquare = w[0]**2 + w[1]**2;
    const vdotx = w[0] * (playerObj.posX - line_to_check.v1[0]) + w[1] * (playerObj.posY - line_to_check.v1[1]);
    // console.log(w,vsquare,vdotx);
    return vdotx >= -20 && vdotx <= vsquare + 20;

}

function get_normal_vector (a_line) {
    const scale_vector = [
        a_line.v1[1] - a_line.v2[1],
        a_line.v2[0] - a_line.v1[0]
    ];
    const mag = Math.sqrt(scale_vector[0]**2 + scale_vector[1]**2);
    return scale_vector.map(x => x/mag);
}

function handle_line_collision (the_line) {
    const normal = get_normal_vector(the_line);
    const offset = normal[0] * the_line.v1[0] + normal[1] * the_line.v1[1];
    const our_side = Math.sign(normal[0] * playerObj.posX + normal[1] * playerObj.posY - offset);
    const rel_poses = playerObj.vertexPoints.map(x => normal[0] * x[0] + normal[1] * x[1] - offset);
    const to_offset = (our_side > 0 ? Math.min : Math.max)(
        rel_poses[0], rel_poses[1], rel_poses[2])
    //console.log(normal, offset, our_side, to_offset);
    playerObj.posX -= to_offset * normal[0];
    playerObj.posY -= to_offset * normal[1];
    const hit_force = normal[0] * playerObj.velocityVect[0] + normal[1] * playerObj.velocityVect[1];
    if (millis() > last_damage + 500) {
        health -= Math.abs(hit_force) * 0.6;
        last_damage = millis();
    }
    if (health <= 0) {
        health = 0;
        noLoop();
    } 
    playerObj.velocityVect[0] -= hit_force * normal[0] * 1.9;
    playerObj.velocityVect[1] -= hit_force * normal[1] * 1.9;
    console.log(health)
}

let last_damage = 0;
let health = 16;